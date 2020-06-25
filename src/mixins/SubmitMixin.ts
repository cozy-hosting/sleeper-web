import { Vue, Component } from "vue-property-decorator";
import { FormModel } from "ant-design-vue";
import { AxiosResponse } from "axios";

@Component
export class SubmitMixin extends Vue {
  submitting = false;

  mixinSubmit(
    form: FormModel,
    cb: () => Promise<AxiosResponse<any>> | Promise<void>,
    successCb: () => void
  ) {
    form.validate(async valid => {
      if (valid) {
        try {
          this.submitting = true;
          await cb();
          successCb();
        } catch (error) {
          console.log("Submit error: " + error);
        } finally {
          this.submitting = false;
        }
      }
    });
  }
}
