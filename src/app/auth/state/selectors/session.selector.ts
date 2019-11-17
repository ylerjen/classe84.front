import { createSelector } from '@ngrx/store';

import { User } from '@models/User';
import { Session } from '@models/Session';
import { SessionState } from '../reducers/session.reducer';


export interface SessionFeatureState {
    sessionState: SessionState;
  }

export const selectSessionState = (state: SessionFeatureState) => state.sessionState;

export const selectSession = createSelector(
    selectSessionState,
    (state: SessionState): Session => state ? state.session : null
  );

export const selectLoggedUser = createSelector(
    selectSession,
    (session: Session): User => session ? session.user : null
);
