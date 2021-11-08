<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">
    <template
      v-if="hasOneShowingChild(item.children,item) && (!menuItem.children||menuItem.noShowingChildren)&&!item.alwaysShow"
    >
      <app-link :to="resolvePath(menuItem.path)">
        <el-menu-item
          :index="resolvePath(menuItem.path)"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <item
            v-if="menuItem.meta"
            :icon="menuItem.meta.icon||item.meta.icon"
            :title="menuItem.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="submenu" :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title"/>
      </template>

      <template v-for="child in item.children">
        <template v-if="!child.hidden">
          <sidebar-item
            v-if="child.children&&child.children.length>0"
            :is-nest="true"
            :item="child"
            :key="child.path"
            :base-path="resolvePath(child.path)"
            class="nest-menu"
          />

          <app-link v-else :to="resolvePath(child.path)" :key="child.name">
            <el-menu-item :index="resolvePath(child.path)">
              <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title"/>
            </el-menu-item>
          </app-link>
        </template>
      </template>
    </el-submenu>
  </div>
</template>

<script>
  import path from 'path'
  import { isExternal } from '@/utils'
  import Item from './Item'
  import AppLink from './Link'
  import FixiOSBug from './FixiOSBug'

  export default {
    name: 'SidebarItem',
    components: { Item, AppLink },
    mixins: [FixiOSBug],
    props: {
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        menuItem: null
      }
    },
    methods: {
      hasOneShowingChild(children, parent) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            this.menuItem = item
            return true
          }
        })

        if (showingChildren.length === 1) {
          return true
        }

        if (showingChildren.length === 0) {
          this.menuItem = { ...parent, path: '', noShowingChildren: true }
          return true
        }

        return false
      },
      resolvePath(routePath) {
        if (this.isExternalLink(routePath)) {
          return routePath
        }
        return path.resolve(this.basePath, routePath)
      },
      isExternalLink(routePath) {
        return isExternal(routePath)
      }
    }
  }
</script>
