
class Store {
  constructor(initialState = {}, reducer) {
    this.state = initialState;
    this.reducer = reducer;
    this.subscriptions = [];
  }

  subscribe(fn) {
    this.subscriptions.push(fn);
  }

  actionLabel(action) {
    return 'Action: ' + action.type
  }

  startLog(action) {
    console.groupCollapsed(this.actionLabel(action));
    console.log(action);
    console.log('before state', this.getState())
  }

  endLog(action) {
    console.log('after state', this.getState())
    console.groupEnd(this.actionLabel(action))
  }

  dispatch(action) {
    this.startLog(action);
    this.state = this.reducer(this.getState(), action);  //updates state and sets to this.state
    this.endLog(action);
    this.runSubscriptions();
  }

  runSubscriptions() {
    this.subscriptions.forEach(fn => fn(this.getState()));
  }

  getState() {
    return this.state;
  }
}
