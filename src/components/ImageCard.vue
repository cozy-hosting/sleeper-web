<template>
  <a-card
    :key="image.id"
    :title="image.name | name | capitalize"
    :extra="image.name | version"
    :class="{ cardDelete: isDelete }"
  >
    <template v-slot:actions>
      <template v-if="!isDelete">
        <div class="edit-button">
          Update
          <a-icon type="reload" />
        </div>
        <div class="delete-button" @click="toggleIsDelete">
          Delete
          <a-icon type="delete" />
        </div>
      </template>
      <template v-else>
        <div class="delete-button" @click="handleDelete">
          Confirm
          <a-icon type="delete" />
        </div>
        <div @click="toggleIsDelete">Cancel</div>
      </template>
    </template>
  </a-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ImageService, { Image } from '@/services/ImageService';

@Component({
  filters: {
    name: (value: string) => value.split(':')[0],
    version: (value: string) => value.split(':')[1]
  }
})
export default class ImageCard extends Vue {
  @Prop({ required: true })
  readonly image!: Image;

  isDelete = false;

  toggleIsDelete() {
    this.isDelete = !this.isDelete;
  }

  handleDelete() {
    // prettier-ignore
    ImageService.delete(this.image.id)
      .then(_ => this.$router.go(0))
      .catch(err => console.log(err))
  }
}
</script>

<style lang="scss" scoped>
.info-list {
  display: flex;
  margin: 0;

  dt {
    margin-right: 5px;
  }
}
.cardDelete {
  border-color: #d73a49;
}
.delete-button {
  color: #d73a49;
}
/*
.cancel-button {
  color: #1890ff;
}*/
</style>
