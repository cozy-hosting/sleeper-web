<template>
  <a-card
    :title="image.name | title"
    :extra="image.name | version"
    :class="{ delete: isDelete }"
  >
    <template slot="actions">
      <template v-if="isDelete">
        <a @click="handleDelete">Confirm</a>
        <a @click="isDelete = !isDelete">Cancel</a>
      </template>
      <template v-else>
        <a @click="handleUpdate">Update</a>
        <a @click="isDelete = !isDelete">Delete</a>
      </template>
    </template>
  </a-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Image } from "@/interfaces/Image/ImageInterface";
import ImageService from "@/services/ImageService";

const imageService = new ImageService();

@Component({
  filters: {
    title: (name: string) => name.split(":")[0],
    version: (name: string) => name.split(":")[1]
  }
})
export default class ImageCard extends Vue {
  @Prop({ required: true }) readonly image!: Image;

  isDelete = false;

  async handleDelete() {
    await imageService.delete(this.image.id);
    this.isDelete = false;
    this.$emit("delete");
  }

  async handleUpdate() {
    await imageService.update(this.image.id);
  }
}
</script>

<style lang="scss" scoped>
.delete {
  border: 1px solid #ff4d4f;
}
</style>
