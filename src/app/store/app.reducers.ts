import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
    shoppingListState: fromShoppingList.State,
    authState: fromAuth.State
}