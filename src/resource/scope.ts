import { BeanScopeBase, Scope, TypeModuleResource } from '@cabloy/core';
import { IModuleLocal } from './locals.js';
import { IModuleModel } from './models.js';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleBzLogin extends BeanScopeBase {}

export interface ScopeModuleBzLogin
  extends TypeModuleResource<
    IModuleLocal,
    IModuleModel,
    typeof config,
    typeof Errors,
    typeof locales,
    typeof constants
  > {}

declare module '@cabloy/core' {
  export interface IBeanScopeRecord {
    'bz-login': ScopeModuleBzLogin;
  }

  export interface IBeanScopeConfig {
    'bz-login': ReturnType<typeof config>;
  }
}
