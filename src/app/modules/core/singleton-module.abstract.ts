import { NgModule } from '@angular/core';

export abstract class AbstractSingletonModule {
  protected constructor(targetModule: NgModule) {
    if (targetModule) {
      throw new Error(
        `${targetModule.constructor.name} has already been loaded. Import this module in the AppModule only.`
      );
    }
  }
}
