// The styles of the card: the boxes in the corners, the icons and the picture of the cameras, the
// menus, the bars of the levels and of the views, the loading screen.
import { css } from 'lit';

export const cardStyles = css`
  .f3d-corner {
    position: absolute;
    z-index: 1000;
    display: flex;
    gap: 6px;
    max-width: calc(100% - 20px);
    pointer-events: none;
  }
  .f3d-corner-top-left,
  .f3d-corner-top-right {
    flex-direction: column;
  }
  .f3d-corner-bottom-left,
  .f3d-corner-bottom-right {
    flex-direction: column-reverse;
  }
  .f3d-corner-top-left,
  .f3d-corner-bottom-left {
    left: 10px;
    align-items: flex-start;
  }
  .f3d-corner-top-right,
  .f3d-corner-bottom-right {
    right: 10px;
    align-items: flex-end;
  }
  .f3d-box {
    pointer-events: auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    max-width: 100%;
    overflow: hidden;
    padding: 6px 10px;
    box-sizing: border-box;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.55);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.6);
    font-size: 13px;
    line-height: 1.2;
    --mdc-icon-size: 22px;
  }
  .f3d-box button {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  .f3d-weather {
    flex-wrap: nowrap;
    gap: 10px;
    cursor: pointer;
  }
  .f3d-status .chip,
  .f3d-chips .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 6px;
    border-radius: 12px;
    font-size: 14px;
  }
  .f3d-status .chip.active {
    background: rgba(255, 255, 255, 0.25);
  }
  .f3d-chips {
    gap: 4px;
  }
  .f3d-chips .label {
    opacity: 0.8;
  }
  .f3d-energy {
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
  }
  .f3d-energy .values {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .f3d-energy .consumers {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 12px;
    opacity: 0.9;
  }
  .f3d-energy .consumer {
    justify-content: space-between;
    gap: 10px;
    width: 100%;
  }
  .f3d-energy .consumer .name,
  .f3d-people .place {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .f3d-energy .consumer .name {
    max-width: 140px;
  }
  .f3d-people {
    align-items: flex-start;
    gap: 10px;
  }
  .f3d-people .person {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    min-width: 44px;
  }
  .f3d-people .avatar {
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    overflow: hidden;
    background: #546e7a;
    font-weight: 600;
  }
  .f3d-people .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .f3d-people .away .avatar {
    filter: grayscale(1);
    opacity: 0.55;
  }
  .f3d-people .name {
    font-size: 12px;
  }
  .f3d-people .place {
    max-width: 80px;
    font-size: 11px;
    opacity: 0.8;
  }
  .f3d-people .place.link {
    text-decoration: underline dotted;
  }
  .f3d-box .fold {
    flex: none;
    align-self: center;
    opacity: 0.75;
    --mdc-icon-size: 20px;
  }
  .f3d-box.end .fold {
    order: -1;
  }
  .f3d-box.collapsed {
    flex-wrap: nowrap;
    gap: 6px;
    cursor: pointer;
  }
  .f3d-people span.avatar {
    display: inline-flex;
    align-items: center;
    flex: none;
  }
  .f3d-people.collapsed {
    align-items: center;
  }
  .f3d-people.collapsed .avatar {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
  .f3d-people .avatar.away {
    filter: grayscale(1);
    opacity: 0.55;
  }
  /* The coloured stripe inside the border of the box (a wider left border met the thin one at the
     rounded corners and looked like two walls); the text stays where it was. */
  .f3d-alarm_panel {
    box-shadow: inset 4px 0 0 var(--f3d-panel, #9e9e9e);
    padding-left: 13px;
    cursor: pointer;
  }
  .f3d-alarm_panel ha-icon {
    color: var(--f3d-panel, #9e9e9e);
  }
  .f3d-alarm_panel.pulse {
    animation: f3d-pulse 1s ease-in-out infinite;
  }
  @keyframes f3d-pulse {
    50% {
      background: rgba(229, 57, 53, 0.7);
    }
  }
  .f3d-weather .now {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 18px;
    --mdc-icon-size: 28px;
  }
  .f3d-weather .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 34px;
  }
  .f3d-weather .when {
    font-size: 11px;
    opacity: 0.85;
  }
  .f3d-weather .low {
    opacity: 0.7;
  }
  .f3d-weather .rain {
    font-size: 11px;
    color: #8ec5ff;
  }
  .f3d-camera_popup {
    position: relative;
    display: block;
    padding: 0;
    animation: f3d-appear 0.25s ease-out;
  }
  .f3d-camera_popup .picture {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 16 / 9;
    background: #000;
    cursor: pointer;
    --mdc-icon-size: 32px;
  }
  .f3d-camera_popup img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .f3d-camera_popup:not(.loaded) img {
    visibility: hidden;
  }
  .f3d-camera_popup .placeholder {
    opacity: 0.5;
  }
  .f3d-camera_popup .caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: baseline;
    gap: 6px;
    padding: 14px 8px 5px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.65));
    font-size: 12px;
    pointer-events: none;
  }
  .f3d-camera_popup .name {
    font-weight: 600;
    white-space: nowrap;
  }
  .f3d-camera_popup .trigger {
    opacity: 0.85;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .f3d-box .close {
    position: absolute;
    top: 4px;
    right: 4px;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.55);
    --mdc-icon-size: 18px;
  }
  @keyframes f3d-appear {
    from {
      opacity: 0;
      transform: scale(0.92);
    }
  }
  /* The buttons of the bars of the views and of selectionMode: a text button, as the Material one
     they were until 2.12.0 (it brought Lit 2 into the card). */
  .f3d-bar-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: 64px;
    height: 36px;
    margin: 0;
    padding: 0 8px;
    border: 0;
    border-radius: 4px;
    background: none;
    color: var(--primary-color, #03a9f4);
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.0892857143em;
    text-transform: uppercase;
    cursor: pointer;
  }
  .f3d-bar-button:hover,
  .f3d-bar-button:focus-visible {
    background: rgba(255, 255, 255, 0.08);
    outline: none;
  }
  .f3d-menu-button {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: 32px;
    min-width: 36px;
    margin: 0;
    padding: 0 8px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    background: rgba(0, 0, 0, 0.55);
    color: white;
    cursor: pointer;
    --mdc-icon-size: 20px;
  }
  .f3d-menu-button.off {
    opacity: 0.7;
  }
  .f3d-menu-button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color, #03a9f4);
  }
  .f3d-pins {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }
  .f3d-pin {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.7);
    background: rgba(0, 0, 0, 0.55);
    color: white;
    cursor: pointer;
    pointer-events: auto;
    visibility: hidden;
    --mdc-icon-size: 18px;
  }
  .f3d-pin:hover,
  .f3d-pin:focus-visible {
    background: rgba(0, 0, 0, 0.8);
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color, #03a9f4);
  }
  .f3d-pin.off {
    opacity: 0.5;
  }
  .f3d-pin.alert {
    background: rgba(229, 57, 53, 0.9);
    animation: f3d-ring 1.2s ease-out infinite;
  }
  .f3d-pins.picking .f3d-pin {
    pointer-events: none;
  }
  @keyframes f3d-ring {
    from {
      box-shadow: 0 0 0 0 rgba(229, 57, 53, 0.7);
    }
    to {
      box-shadow: 0 0 0 14px rgba(229, 57, 53, 0);
    }
  }
  .f3d-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 200px;
    height: 100%;
    padding: 24px;
    box-sizing: border-box;
    text-align: center;
    color: var(--secondary-text-color, #727272);
    font-size: 14px;
  }
  .f3d-icon {
    width: 44px;
    height: 44px;
    fill: var(--primary-color, #03a9f4);
    animation: f3d-float 2.4s ease-in-out infinite;
  }
  .f3d-title {
    color: var(--primary-text-color, #212121);
    font-size: 15px;
    font-weight: 500;
  }
  .f3d-bar {
    position: relative;
    width: min(260px, 70%);
    height: 4px;
    border-radius: 2px;
    overflow: hidden;
    background: var(--divider-color, rgba(127, 127, 127, 0.25));
  }
  .f3d-fill {
    height: 100%;
    width: 0;
    border-radius: 2px;
    background: var(--primary-color, #03a9f4);
    transition: width 0.25s ease;
  }
  .f3d-bar.indeterminate .f3d-fill {
    position: absolute;
    width: 35%;
    animation: f3d-slide 1.3s ease-in-out infinite;
  }
  .f3d-detail {
    min-height: 1.3em;
    font-size: 12px;
    opacity: 0.85;
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }
  .f3d-loading.error .f3d-icon {
    fill: var(--error-color, #db4437);
    animation: none;
  }
  .f3d-loading.error .f3d-title {
    color: var(--error-color, #db4437);
  }
  .f3d-loading.error .f3d-bar,
  .f3d-loading.setup .f3d-bar {
    display: none;
  }
  .f3d-loading.setup .f3d-icon {
    animation: none;
  }
  @keyframes f3d-slide {
    from {
      left: -35%;
    }
    to {
      left: 100%;
    }
  }
  @keyframes f3d-float {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-4px) rotate(-8deg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .f3d-icon,
    .f3d-pin.alert,
    .f3d-camera_popup {
      animation: none;
    }
    .f3d-bar.indeterminate .f3d-fill {
      animation-duration: 3s;
    }
  }
`;
