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
import { Image } from "@/interfaces/imageInterfaces";
import { ImageModule } from "@/store";
import ImageService from "@/services/ImageService";

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
    await ImageModule.deleteImage(this.image.id);
    this.isDelete = false;
  }

  async handleUpdate() {
    await ImageService.update(this.image.id);
  }
}
</script>

<style lang="scss" scoped>
.delete {
  border: 1px solid #ff4d4f;
}
</style>
