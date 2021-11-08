<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" @click="handleCreate">Nova Categoria</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="orderedCategories.filter(data => !query.title || data.title.toLowerCase().includes(query.title.toLowerCase()))"
      fit
    >
      <el-table-column label="Cód." prop="id" width="60"/>
      <el-table-column label="Nome" prop="title"/>
      <el-table-column label="Imagem">
        <template slot-scope="scope">
          <div class="product-tumbnail">
            <img
              :src="scope.row.image && scope.row.image.url ? scope.row.image.url : 'data:image/png;base64,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'"
              :alt="scope.row.image && scope.row.image.orginal_name ? scope.row.image.orginal_name : 'Sem Imagem'"
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column align="right" width="200">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="query.title"
            :key="scope.row ? scope.row.id : ''"
            size="mini"
            placeholder="Filtrar"
            clearable
            @keyup.enter.native="handleSearch"
            @clear="handleClearSearch"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row.id)">Editar</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="categories.pagination.total && categories.pagination.total > 0"
      :total="categories.pagination.total ? categories.pagination.total : 0"
      :page.sync="query.page"
      :limit.sync="query.limit"
      @pagination="fetch"
    />
    <el-dialog
      :visible.sync="dialogVisible"
      :title="`${isEdit ? 'Editar' : 'Criar'} Categoria`"
      width="50%"
    >
      <el-dialog :visible.sync="innerVisible" width="50%" title="Confirmação" append-to-body center>
        <span>
          Tem certeza que deseja deletar a categoria:
          <b>{{ formData.title }}</b>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">Cancelar</el-button>
          <el-button type="primary" @click="handleDelete">Confirmar</el-button>
        </span>
      </el-dialog>
      <el-col :span="7">
        <div class="category-thumb" @click="mediaManager = true">
          <img
            :src="formData.image && formData.image.url ? formData.image.url : '/static/sem-imagem.png'"
            :alt="formData.image && formData.image.original_name ? formData.image.original_name : 'Sem Imagem' "
            class="category-image"
          >
        </div>
      </el-col>
      <el-col :span="16" :push="1">
        <el-form ref="form" :model="formData">
          <el-form-item label="Título">
            <el-input v-model="formData.title" placeholder="Nome da Categoria"/>
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="formData.description" type="textarea" placeholder="Descrição"/>
          </el-form-item>
        </el-form>
      </el-col>
      <span slot="footer" class="dialog-footer">
        <el-button
          v-if="formData.id"
          type="danger"
          style="float:left;"
          @click="innerVisible = true"
        >
          Deletar
        </el-button>
        <el-button @click="dialogVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="handleSave">Confirmar</el-button>
      </span>
    </el-dialog>
    <media-manager
      :visibility.sync="mediaManager"
      :image="formData.image"
      @selectImage="changeImage"
    />
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { mapGetters } from 'vuex'
  import { orderBy } from 'lodash'
  import MediaManager from '@/components/MediaManager'

  const defaultForm = {
    title: '',
    description: ''
  }

  export default {
    name: 'CategoriesListing',

    components: { Pagination, MediaManager },

    data() {
      return {
        query: {
          title: undefined,
          page:
            this.categories && this.categories.pagination.page
              ? this.categories.pagination.page
              : 1,
          limit: 10
        },
        loading: false,
        dialogVisible: false,
        innerVisible: false,
        mediaManager: false,
        formData: this.category ? this.category : {},
        isEdit: false
      }
    },

    computed: {
      ...mapGetters({
        categories: 'categories',
        category: 'currentCategory'
      }),
      orderedCategories() {
        return orderBy(this.categories.data, 'id')
      }
    },

    created() {
      if (this.$route.query && this.$route.query.page) {
        this.query.page = parseInt(this.$route.query.page)
      }
    },

    mounted() {
      this.fetch()

      this.formData = Object.assign({}, defaultForm)
    },

    methods: {
      fetch() {
        this.loading = true
        this.updateQueryParameters()
        return this.$store.dispatch('fetchCategories', this.query).then(() => {
          this.loading = false
        })
      },

      handleSearch() {
        this.loading = true
        this.fetch().then(() => (this.loading = false))
      },

      handleClearSearch() {
        this.query.title = undefined
        this.loading = true
        this.fetch().then(() => (this.loading = false))
      },

      handleEdit(id) {
        this.isEdit = true
        this.loading = true
        this.$store.dispatch('findCategory', id).then(() => {
          this.formData = Object.assign({}, this.category)
          this.loading = false
          this.dialogVisible = true
        })
      },

      handleCreate() {
        this.isEdit = false
        this.formData = Object.assign({}, defaultForm)
        this.dialogVisible = true
      },

      handleSave() {
        this.loading = true
        this.$store.dispatch('saveCategory', this.formData).then(() => {
          this.loading = false
          this.$message({
            message: 'Salvo com sucesso!',
            type: 'success',
            showClose: true,
            duration: 10000
          })
          this.formData = Object.assign({}, this.category)
          this.isEdit = true
        })
      },

      handleDelete() {
        this.loading = true
        this.$store.dispatch('destroyCategory', this.formData.id).then(() => {
          this.loading = false
          this.innerVisible = false
          this.dialogVisible = false
          this.$message({
            message: 'Deletado com sucesso!',
            type: 'warning',
            showClose: true,
            duration: 1000
          })
        })
      },

      changeImage(image) {
        this.formData.image_id = image.id
        this.formData.image = image
      },

      updateQueryParameters() {
        if (this.query.page > 1) {
          this.$router.replace({ query: { page: this.query.page } })
        } else if (this.query.page === 1) {
          this.$router.replace({ query: {} })
        }
      }
    }
  }
</script>

<style scoped>
  .category-thumb {
    cursor: pointer;
  }
  img.category-image {
    width: 100%;
    height: 1000%;
  }

  .product-tumbnail img {
    height: 64px;
    width: 64px;
  }
</style>

