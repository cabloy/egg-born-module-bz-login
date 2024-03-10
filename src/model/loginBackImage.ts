import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityLoginBackImage } from '../entity/loginBackImage.js';

@Model({ table: 'bzLoginBackImage', options: { disableDeleted: false } })
export class ModelLoginBackImage extends BeanModelBase<EntityLoginBackImage> {}
