# Piano di Implementazione - Issue #25

## Panoramica
Implementazione di 3 miglioramenti richiesti nella Issue #25:
1. Fix icone CCTV invisibili (problema z-index)
2. Supporto per ground_floor_level (erba/cielo con seminterrato)
3. Animazioni controllate da sensori (speed/degrees da entità)

---

## 1. ICONE CCTV INVISIBILI

### Problema
Le icone delle telecamere sono nascoste quando la casa è visibile. Appaiono solo quando si fa zoom per rendere la casa invisibile. Sono posizionate come overlay HTML ma vengono occluse visivamente.

### Analisi del Codice
- File: `src/floor3d-card.ts`
- Metodo `_renderPins()`: Crea elementi HTML `.f3d-pin` in un layer `_pinsEl`
- Metodo `_placePins()`: Posiziona le icone usando `project()` per convertire coordinate 3D → 2D
- Le icone vengono nascoste quando `view.z < 0` (dietro la camera) o fuori dal frustum

### Root Cause
Il check `view.z < 0` nasconde le icone quando sono "dietro" la camera nello spazio di visualizzazione, ma non considera l'occlusione dalla geometria del modello 3D.

### Soluzione
Implementare un **raycasting** per determinare se un oggetto del modello è tra la camera e la posizione della CCTV:
1. Creare un ray dalla camera verso la posizione della CCTV
2. Usare `raycaster.intersectObjects()` per verificare se il modello blocca la visuale
3. Se bloccato, nascondere l'icona o renderla semi-trasparente

### Implementazione
```typescript
// In _placePins(), dopo il check view.z < 0:
if (shown) {
  // Raycast per verificare occlusione
  const raycaster = new THREE.Raycaster();
  const direction = point.clone().sub(this._camera.position).normalize();
  const distance = this._camera.position.distanceTo(point);
  
  raycaster.set(this._camera.position, direction);
  raycaster.far = distance * 0.95; // Leggermente prima del punto CCTV
  
  // Interseca solo con il modello, non con ground/overlays
  const intersects = raycaster.intersectObjects(
    this._bboxmodel.children, 
    true
  ).filter(hit => !hit.object.name.includes('f3d_') && !hit.object.name.includes('_room_color'));
  
  // Se c'è un'intersezione, l'icona è occlusa
  if (intersects.length > 0) {
    shown = false; // O: el.style.opacity = '0.3' per semi-trasparenza
  }
}
```

**Priorità**: Bassa (l'utente dice non critico)
**Impatto**: Miglioramento UX

---

## 2. GROUND_FLOOR_LEVEL (Erba/Cielo con Seminterrato)

### Problema
Quando c'è un seminterrato, la casa viene "sollevata" perché il programma considera il seminterrato come piano terra (livello 0). L'erba appare al livello sbagliato.

### Analisi del Codice
- File: `src/floor3d-card.ts`, metodo `_initGround()` (linea 4599-4639)
- Attualmente: `ground.position.y = bottom - 0.5` dove `bottom = new THREE.Box3().setFromObject(this._bboxmodel).min.y`
- Il ground è posizionato alla base del bounding box del modello

### Root Cause
Il bounding box include TUTTI i livelli del modello, incluso il seminterrato. Non c'è modo di specificare quale sia il "vero" piano terra.

### Soluzione
Aggiungere un parametro di configurazione `ground_floor_level` che permette all'utente di specificare l'offset Y desiderato:

#### 2.1 Aggiornare Types
File: `src/types.ts`
```typescript
export interface Floor3dCardConfig {
  // ... existing fields ...
  ground?: string; // esistente
  ground_floor_level?: number | string; // NUOVO: offset Y per posizionare ground/sky
```

#### 2.2 Aggiornare Config
File: `src/config.ts`
```typescript
const VALUE_DEFAULTS: { [key: string]: string | number } = {
  // ... existing defaults ...
  ground_floor_level: 0, // NUOVO: default 0 (nessun offset)
```

#### 2.3 Modificare _initGround()
File: `src/floor3d-card.ts`
```typescript
private _initGround(): void {
  // ... codice esistente fino a line 4632 ...
  const ground = new THREE.Mesh(geometry, material);
  ground.name = 'f3d_ground';
  const bottom = new THREE.Box3().setFromObject(this._bboxmodel).min.y;
  
  // NUOVO: Applica offset da configurazione
  const groundOffset = this._num('ground_floor_level', 0);
  ground.position.set(
    this._modelCenter.x, 
    bottom - 0.5 + groundOffset, // Offset applicato qui
    this._modelCenter.z
  );
  
  // ... resto del codice ...
}
```

#### 2.4 Aggiungere al Schema Editor
File: `src/editor-schema.ts`
Aggiungere nel section appropriato (probabilmente "Sky and weather"):
```typescript
num('ground_floor_level', { unit: 'cm' })
```

#### 2.5 Aggiungere Localizzazioni
Files: `src/localize/editor/en.json`, `it.json`, `de.json`
```json
{
  "ground_floor_level": "Ground floor level",
  "ground_floor_level_helper": "Y offset for ground and sky positioning (useful with basements). Default: 0"
}
```

**Priorità**: MEDIA-ALTA
**Impatto**: Risolve problema visivo significativo per case con seminterrati

---

## 3. ANIMAZIONI CONTROLLATE DA SENSORI

### Problema
Attualmente `type3d: rotate` supporta solo entità on/off e attributo `percentage`. L'utente vuole:
- Un sensore "speed" che controlla la velocità di rotazione
- Un sensore "degrees" che controlla l'angolo di rotazione (per porte, ecc.)

### Analisi del Codice Esistente
- File: `src/floor3d-card.ts`
- Metodo `_rotatecalc()` (linea 6331-6353):
  - Legge stato on/off
  - Legge attributo `percentage` (0-100)
  - Legge attributo `direction` (forward/reverse)
  - Imposta `_rotation_state[j]` (0-1)

### Soluzione Proposta

#### 3.1 Estendere la Configurazione di `rotate`
File: `src/types.ts`
```typescript
// Aggiungere campi alla config esistente
rotate: {
  round_per_second: number;
  axis: string;
  ramp?: number;
  // NUOVO:
  speed_entity?: string;     // Sensore che fornisce velocità (numero)
  speed_multiplier?: number; // Moltiplicatore per speed (default: 1)
  angle_entity?: string;     // Sensore che fornisce angoli (gradi)
  angle_min?: number;        // Angolo min (default: 0)
  angle_max?: number;        // Angolo max (default: 360)
}
```

#### 3.2 Modificare _rotatecalc()
File: `src/floor3d-card.ts`
```typescript
private _rotatecalc(entity: Floor3dCardConfig, i: number) {
  let j = this._rotation_index.indexOf(i);
  
  // NUOVO: Check per speed_entity
  if (entity.rotate.speed_entity) {
    const speedState = this._hass.states[entity.rotate.speed_entity];
    if (speedState) {
      const speed = parseFloat(speedState.state);
      if (!isNaN(speed)) {
        const multiplier = entity.rotate.speed_multiplier || 1;
        this._rotation_state[j] = (speed * multiplier) / 100; // Normalizza 0-1
        this._startOrStopAnimationLoop();
        return;
      }
    }
  }
  
  // NUOVO: Check per angle_entity
  if (entity.rotate.angle_entity) {
    const angleState = this._hass.states[entity.rotate.angle_entity];
    if (angleState) {
      const angle = parseFloat(angleState.state);
      if (!isNaN(angle)) {
        const min = entity.rotate.angle_min || 0;
        const max = entity.rotate.angle_max || 360;
        // Normalizza angolo a 0-1
        this._rotation_state[j] = (angle - min) / (max - min);
        this._startOrStopAnimationLoop();
        return;
      }
    }
  }
  
  // EXISTING: Codice originale per on/off/percentage
  this._rotation_state[j] = this._states[i] == 'on' ? 1 : 0;
  
  if (this._rotation_state[j] != 0 && this._hass.states[entity.entity].attributes['percentage']) {
    this._rotation_state[j] = this._hass.states[entity.entity].attributes['percentage'] / 100;
  }
  
  if (
    this._rotation_state[j] != 0 &&
    this._hass.states[entity.entity].attributes['direction'] &&
    this._hass.states[entity.entity].attributes['direction'] == 'reverse'
  ) {
    this._rotation_state[j] = 0 - this._rotation_state[j];
  }
  
  this._startOrStopAnimationLoop();
}
```

#### 3.3 Tracciare Dipendenze per speed_entity e angle_entity
Nel metodo che registra le dipendenze (per triggering updates), aggiungere:
```typescript
// Trovare dove vengono registrate le entity subscriptions
// Aggiungere speed_entity e angle_entity alle dipendenze
if (entity.type3d === 'rotate') {
  if (entity.rotate.speed_entity) {
    // Aggiungi a watched entities
  }
  if (entity.rotate.angle_entity) {
    // Aggiungi a watched entities
  }
}
```

#### 3.4 Aggiornare Config e Schema
File: `src/config.ts`
```typescript
const BLOCK_NUMBERS: { [block: string]: string[] } = {
  // ... existing ...
  rotate: [
    'round_per_second', 
    'ramp', 
    'speed_multiplier',  // NUOVO
    'angle_min',         // NUOVO
    'angle_max'          // NUOVO
  ],
```

File: `src/editor-schema.ts`
Aggiungere nel rotate options schema:
```typescript
entity('speed_entity'),
num('speed_multiplier'),
entity('angle_entity'),
num('angle_min'),
num('angle_max')
```

#### 3.5 Localizzazione
Files: `src/localize/editor/en.json`, `it.json`, `de.json`
```json
{
  "speed_entity": "Speed sensor",
  "speed_entity_helper": "Numeric sensor controlling rotation speed",
  "speed_multiplier": "Speed multiplier",
  "speed_multiplier_helper": "Multiply sensor value by this (default: 1)",
  "angle_entity": "Angle sensor",
  "angle_entity_helper": "Numeric sensor controlling rotation angle (degrees)",
  "angle_min": "Minimum angle",
  "angle_min_helper": "Minimum angle value (default: 0)",
  "angle_max": "Maximum angle", 
  "angle_max_helper": "Maximum angle value (default: 360)"
}
```

**Priorità**: ALTA (Feature esplicitamente richiesta)
**Impatto**: Nuova funzionalità, migliora interattività con sensori

---

## 4. ALTERNATIVE CONSIDERATE

### Per CCTV Icons
**Alternativa 1**: Usare Three.js Sprites invece di HTML overlay
- Pro: Parte della scena 3D, depth testing automatico
- Contro: Più complesso da implementare, richiede texture management

**Alternativa 2**: Sempre visibili con trasparenza graduale
- Pro: Più semplice
- Contro: Può confondere l'utente

**Scelta**: Raycasting con nascondi/mostra (implementazione attuale + occlusione check)

### Per Ground Floor Level
**Alternativa 1**: Auto-detect del piano terra analizzando livelli
- Pro: Automatico
- Contro: Complesso, può sbagliare

**Alternativa 2**: Parametro ground_floor_level manuale
- Pro: Semplice, preciso, controllabile dall'utente
- Contro: Richiede configurazione manuale

**Scelta**: Parametro manuale (come suggerito dall'utente)

### Per Sensor-Controlled Animations
**Alternativa 1**: Creare nuovo type3d: sensor_rotate
- Pro: Separazione delle responsabilità
- Contro: Duplicazione codice, confusione utente

**Alternativa 2**: Estendere rotate esistente con nuovi parametri opzionali
- Pro: Backward compatible, riusa logica esistente
- Contro: Configurazione più complessa

**Scelta**: Estendere rotate esistente (backward compatible)

---

## 5. ORDINE DI IMPLEMENTAZIONE

1. **Ground Floor Level** (più semplice, alto impatto)
   - Aggiungere type/config/defaults
   - Modificare _initGround()
   - Aggiungere editor schema
   - Aggiungere localizzazioni
   - Test

2. **Sensor-Controlled Animations** (feature richiesta)
   - Estendere types per rotate config
   - Modificare _rotatecalc()
   - Aggiungere tracking dipendenze
   - Aggiornare config/schema
   - Localizzazioni
   - Test

3. **CCTV Icons Fix** (priorità bassa ma buon polish)
   - Implementare raycasting in _placePins()
   - Test con diversi zoom levels
   - Performance check

---

## 6. TESTING

### Ground Floor Level
- [ ] Test con ground_floor_level = 0 (default, nessun cambio)
- [ ] Test con valore positivo (es. 300)
- [ ] Test con valore negativo (es. -200)
- [ ] Test senza ground configurato (nessun crash)
- [ ] Verificare che sky_background non sia affetto

### Sensor Animations
- [ ] Test speed_entity con valori 0-100
- [ ] Test speed_entity con speed_multiplier
- [ ] Test angle_entity con valori 0-360
- [ ] Test angle_entity con angle_min/max custom
- [ ] Test backward compatibility (rotate senza nuovi parametri)
- [ ] Test con entità mancante/unavailable

### CCTV Icons
- [ ] Test con icona visibile (nessun modello tra camera e CCTV)
- [ ] Test con icona occlusa (modello blocca vista)
- [ ] Test con zoom in/out
- [ ] Test performance con molte CCTV
- [ ] Test con diversi livelli (level parameter)

---

## 7. DOCUMENTAZIONE DA AGGIORNARE

- [ ] README.md: Aggiungere ground_floor_level e sensor animations a features
- [ ] FORK.md: Documentare i 3 nuovi miglioramenti
- [ ] Aggiungere esempi di configurazione per ciascuna feature
- [ ] Screenshot/GIF per dimostrare le features

---

## 8. RISCHI E MITIGAZIONI

### Ground Floor Level
**Rischio**: Utenti confusi su quale valore usare
**Mitigazione**: Helper text chiaro, esempio in docs

### Sensor Animations
**Rischio**: Performance con molti sensori che aggiornano frequentemente
**Mitigazione**: _rotatecalc già gestisce throttling via _startOrStopAnimationLoop

### CCTV Icons
**Rischio**: Raycasting può essere costoso con molte CCTV
**Mitigazione**: Raycast solo quando necessario, cache results, far limit su raycaster

---

## 9. COMMIT STRATEGY

Commit separati per ciascuna feature:
1. `feat: add ground_floor_level parameter for basement support`
2. `feat: add sensor-controlled animations (speed/angle entities)`
3. `fix: CCTV icons hidden behind model geometry`

PR unico con tutti e 3 i commits, chiude Issue #25.

---

## 10. STIMA EFFORT

- Ground Floor Level: **2-3 ore** (semplice, cambio parametro)
- Sensor Animations: **4-5 ore** (logica moderata, testing)
- CCTV Icons: **2-3 ore** (raycasting, testing edge cases)

**Totale: 8-11 ore**
