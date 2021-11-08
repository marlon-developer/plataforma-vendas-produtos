<template>
  <div class="navbar">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item"/>
      </template>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar ? avatar : 'data:image/png;base64,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'" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>Dashboard</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">Sair</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import ErrorLog from '@/components/ErrorLog'
  import Screenfull from '@/components/Screenfull'
  import SizeSelect from '@/components/SizeSelect'
  import LangSelect from '@/components/LangSelect'
  import ThemePicker from '@/components/ThemePicker'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
      ErrorLog,
      Screenfull,
      SizeSelect,
      LangSelect,
      ThemePicker
    },
    computed: {
      ...mapGetters(['sidebar', 'name', 'avatar', 'device'])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container {
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      float: right;
      height: 100%;
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 20px;
      }
      .international {
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .avatar-container {
        height: 50px;
        margin-right: 30px;
        .avatar-wrapper {
          margin-top: 5px;
          position: relative;
          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
