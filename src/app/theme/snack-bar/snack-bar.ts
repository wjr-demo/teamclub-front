import { ComponentRef, Injectable } from '@angular/core';
import {
  ComponentPortal,
  ComponentType,
  LiveAnnouncer,
  MdSnackBarConfig,
  MdSnackBarContainer,
  MdSnackBarRef,
  Overlay,
  OverlayRef,
  OverlayState,
  SimpleSnackBar
} from '@angular/material';

export function extendObject(dest: any, ...sources: any[]): any {
  if (dest == null) {
    throw TypeError('Cannot convert undefined or null to object');
  }

  for (let source of sources) {
    if (source != null) {
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          dest[key] = source[key];
        }
      }
    }
  }

  return dest;
}

/**
 * Service to dispatch Material Design snack bar messages.
 */
@Injectable()
export class OwnMdSnackBar {
  /** A reference to the current snack bar in the view. */
  private _snackBarRef: MdSnackBarRef<any>;

  constructor(private _overlay: Overlay, private _live: LiveAnnouncer) {}

  /**
   * Creates and dispatches a snack bar with a custom component for the content, removing any
   * currently opened snack bars.
   *
   * @param component Component to be instantiated.
   * @param config Extra configuration for the snack bar.
   */
  openFromComponent<T>(component: ComponentType<T>, config?: MdSnackBarConfig): MdSnackBarRef<T> {
    config = _applyConfigDefaults(config);
    let overlayRef = this._createOverlay();
    let snackBarContainer = this._attachSnackBarContainer(overlayRef, config);
    let snackBarRef = this._attachSnackbarContent(component, snackBarContainer, overlayRef);

    // When the snackbar is dismissed, clear the reference to it.
    snackBarRef.afterDismissed().subscribe(() => {
      // Clear the snackbar ref if it hasn't already been replaced by a newer snackbar.
      if (this._snackBarRef == snackBarRef) {
        this._snackBarRef = null;
      }
    });

    // If a snack bar is already in view, dismiss it and enter the new snack bar after exit
    // animation is complete.
    if (this._snackBarRef) {
      this._snackBarRef.afterDismissed().subscribe(() => {
        snackBarRef.containerInstance.enter();
      });
      this._snackBarRef.dismiss();
    // If no snack bar is in view, enter the new snack bar.
    } else {
      snackBarRef.containerInstance.enter();
    }

    // If a dismiss timeout is provided, set up dismiss based on after the snackbar is opened.
    if (config.duration > 0) {
      snackBarRef.afterOpened().subscribe(() => {
        let timeout = setTimeout(() =>{ snackBarRef.dismiss();clearTimeout(timeout);}, config.duration);
      });
    }

    this._live.announce(config.announcementMessage, config.politeness);
    this._snackBarRef = snackBarRef;
    return this._snackBarRef;
  }

  /**
   * Opens a snackbar with a message and an optional action.
   * @param message The message to show in the snackbar.
   * @param action The label for the snackbar action.
   * @param config Additional configuration options for the snackbar.
   */
  open(message: string, action = '', config: MdSnackBarConfig = {}): MdSnackBarRef<SimpleSnackBar> {
    config.announcementMessage = message;
    let simpleSnackBarRef = this.openFromComponent(SimpleSnackBar, config);
    simpleSnackBarRef.instance.snackBarRef = simpleSnackBarRef;
    simpleSnackBarRef.instance.message = message;
    simpleSnackBarRef.instance.action = action;
    return simpleSnackBarRef;
  }

  alert(message: string,action='',config:MdSnackBarConfig={duration:2000}): MdSnackBarRef<SimpleSnackBar>{
    config.announcementMessage = message;
    let simpleSnackBarRef = this.openFromComponent(SimpleSnackBar, config);
    simpleSnackBarRef.instance.snackBarRef = simpleSnackBarRef;
    simpleSnackBarRef.instance.message = message;
    simpleSnackBarRef.instance.action = action;
    return simpleSnackBarRef;
  }

  /**
   * Attaches the snack bar container component to the overlay.
   */
  private _attachSnackBarContainer(overlayRef: OverlayRef,
                                   config: MdSnackBarConfig): MdSnackBarContainer {
    let containerPortal = new ComponentPortal(MdSnackBarContainer, config.viewContainerRef);
    let containerRef: ComponentRef<MdSnackBarContainer> = overlayRef.attach(containerPortal);
    containerRef.instance.snackBarConfig = config;

    return containerRef.instance;
  }

  /**
   * Places a new component as the content of the snack bar container.
   */
  private _attachSnackbarContent<T>(component: ComponentType<T>,
                                    container: MdSnackBarContainer,
                                    overlayRef: OverlayRef): MdSnackBarRef<T> {
    let portal = new ComponentPortal(component);
    let contentRef = container.attachComponentPortal(portal);
    return new MdSnackBarRef(contentRef.instance, container, overlayRef);
  }

  /**
   * Creates a new overlay and places it in the correct location.
   */
  private _createOverlay(): OverlayRef {
    let state = new OverlayState();
    state.positionStrategy = this._overlay.position().global()
        .centerHorizontally()
        .top('0');
    return this._overlay.create(state);
  }
}

/**
 * Applies default options to the snackbar config.
 * @param config The configuration to which the defaults will be applied.
 * @returns The new configuration object with defaults applied.
 */
function _applyConfigDefaults(config: MdSnackBarConfig): MdSnackBarConfig {
  return extendObject(new MdSnackBarConfig(), config);
}
