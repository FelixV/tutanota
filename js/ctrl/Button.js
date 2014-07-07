"use strict";

goog.provide('tutao.tutanota.ctrl.Button');

/**
 * Defines a button.
 * @constructor
 * @param {string} label The label visible on the button.
 * @param {number} priority The higher the value the higher the priority. Priority 0 buttons are only in the more menu.
 * @param {function} clickCallback Is called when the button is clicked.
 * @param {function=} isVisible The button is displayed, if this function returns true
 * @param {boolean=} directClick True if the click event shall not be deferred by a setTimeout (needed to avoid alert/confirm popup bugs).
 * @param {string=} id The id to set for the button.
 * @param {string=} imageClass If set, the accoding image will be displayed
 * @param {string=} imageAltText alt text for the optional image
 */
tutao.tutanota.ctrl.Button = function (label, priority, clickCallback, isVisible, directClick, id, imageClass, imageAltText) {
    tutao.util.FunctionUtils.bindPrototypeMethodsToThis(this);
    this.label = ko.computed(function() {
        return tutao.locator.languageViewModel.get(label)
    });
    this._priority = priority;
    this._clickCallback = clickCallback;
    this._directClick = (directClick) ? true : false;
    this.id = id;
    this.isVisible = isVisible ? isVisible : function () {
        return true;
    };
    this.imageClass = imageClass;
    this.imageAltText = ko.computed(function() {
        return tutao.locator.languageViewModel.get(imageAltText)
    });
};

/**
 * Provides the priority of the button.
 * @return {number} 0 or positive number value.
 */
tutao.tutanota.ctrl.Button.prototype.getPriority = function () {
    return this._priority;
};

/**
 * Executes the click functionality.
 * @param {Object} vm The view model.
 * @param {Event} event The click event.
 */
tutao.tutanota.ctrl.Button.prototype.click = function (vm, event) {
    if (this._directClick) {
        // needed e.g. for opening a file chooser because a setTimeout in between would not work
        this._clickCallback();
    } else {
        var self = this;
        // setTimeout because otherwise problems with alert/confirm dialogs appear
        setTimeout(function () {
            self._clickCallback();
        }, 0);
    }
};
