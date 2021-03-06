<template lang="pug">
.profile-card
  .profile-details-image
    figure.image.is-square(
      @mouseover="isProfilePictureHovered = true"
      @mouseleave="isProfilePictureHovered = false"
    )
      img.is-rounded(:src="user.imageURL")

      transition(name="edit-button")
        .edit-image-button(v-if="isProfilePictureHovered")
          a.button.is-rounded(@click="showProfileModal")
            span.icon
              i.fas.fa-edit
            span  New image

  .profile-details-content
    .content
      p.title.is-4 {{ user.name }}
      p.subtitle.is-6 @{{ user.username }}

      template(v-if="!isEditing")
        p.bio {{ user.bio}}
        a.bio-edit(@click="onBioEdit") Edit

      template(v-else)
        .label Edit bio:
        .control
          textarea.textarea(
            v-model="newBio"
            placeholder="Write a bio..."
          )

        .bio-edit-buttons
          a(@click="onBioCancel") Cancel
          a(@click="onBioSave") Save
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'OwnProfileDetails',
  data () {
    return {
      isEditing: false,
      isProfilePictureHovered: false,
      isUploading: false,
      newBio: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  mounted () {
    this.$emit('loaded')
  },
  methods: {
    onBioEdit () {
      this.isEditing = true
      this.newBio = this.user.bio
    },
    onBioCancel () {
      this.isEditing = false
    },
    onBioSave () {
      const { newBio } = this
      this.isEditing = false
      this.updateBio({ newBio })
    },
    ...mapActions({
      showProfileModal: 'modal/showProfileUploadModal',
      updateBio: 'user/updateBio'
    })
  }
}
</script>

<style lang="scss" scoped>
.profile-details {
  max-width: 100%;
  position: relative;

  &-image {
    padding: 15px;
    position: relative;

    & img {
      transition: all 0.2s ease;
    }

      &:hover {
        & img {
          filter: blur(4px);
        }
      }

    .edit-image-button {
      position: absolute;
      top: 80%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &-content {
    padding: 10px 20px;

    & .bio {
      padding-bottom: 0;
      margin-bottom: 0;
      word-break: break-all;
    }

    & .textarea {
      border-radius: 0.75rem;
    }

    & .bio-edit-buttons {
      & a:last-child {
        margin-left: 1rem;
      }
    }
  }
}

.edit-button {
  &-enter, &-leave-to {
    opacity: 0;
  }

  &-enter-to, &-leave {
    opacity: 1;
  }

  &-enter-active, &-leave-active {
    transition: all 0.2s ease;
  }
}
</style>
