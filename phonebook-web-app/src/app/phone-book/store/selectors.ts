import { createFeatureSelector } from '@ngrx/store';
import { PhoneBookState, PhoneBookFeatureName } from './state';


export const phoneBookFeatureSelector = createFeatureSelector<PhoneBookState>(PhoneBookFeatureName);
