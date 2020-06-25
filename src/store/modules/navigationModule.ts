import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

@Module({ namespaced: true, name: "navigationModule" })
class NavigationModule extends VuexModule {
  hidden = true;

  @Mutation
  TOGGLE_HIDDEN() {
    this.hidden = !this.hidden;
  }

  @Mutation
  HIDE() {
    this.hidden = true;
  }

  @Mutation
  SHOW() {
    this.hidden = false;
  }

  @Action
  toggleHidden() {
    this.TOGGLE_HIDDEN();
  }

  @Action
  show() {
    this.SHOW();
  }

  @Action
  hide() {
    this.HIDE();
  }
}

export default NavigationModule;
