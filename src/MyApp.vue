<template>
  <n-config-provider :theme="inverted ? darkTheme : null">
    <n-space vertical :size="0">
      <!-- Header -->
      <n-layout-header bordered :inverted="inverted" style="height: 64px; padding: 0 24px; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <n-icon size="32" :component="PawOutline" :color="inverted ? '#fff' : '#18a058'" />
          <span style="font-size: 24px; font-weight: bold;">Dog House</span>
        </div>
        <n-space align="center">
          <n-switch v-model:value="inverted" />
          <span>Dark Mode</span>
        </n-space>
      </n-layout-header>

      <!-- Main Layout with Sider -->
      <n-layout has-sider style="height: calc(100vh - 128px);">
        <!-- Sidebar -->
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :native-scrollbar="false"
          :inverted="inverted"
          v-model:collapsed="collapsed"
        >
          <n-menu
            :inverted="inverted"
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            v-model:value="activeKey"
            @update:value="handleMenuSelect"
          />
        </n-layout-sider>

        <!-- Main Content -->
        <n-layout-content :inverted="inverted" style="padding: 24px;" :native-scrollbar="false">
          <!-- Loading State -->
          <div v-if="loading" style="display: flex; justify-content: center; padding: 48px;">
            <n-spin size="large" />
          </div>

          <!-- All Dogs View -->
          <div v-else-if="activeKey === 'all-dogs'">
            <n-space vertical :size="24">
              <div>
                <h1 style="margin: 0 0 8px 0;">All Dog Breeds</h1>
                <p style="margin: 0; opacity: 0.8;">Explore {{ dogBreeds.length }} amazing dog breeds</p>
              </div>

              <!-- Search and Filters -->
              <n-space>
                <n-input
                  v-model:value="searchQuery"
                  placeholder="Search breeds..."
                  clearable
                  style="width: 300px;"
                >
                  <template #prefix>
                    <n-icon :component="SearchOutline" />
                  </template>
                </n-input>
                <n-select
                  v-model:value="selectedGroup"
                  :options="groupOptions"
                  placeholder="Filter by group"
                  clearable
                  style="width: 200px;"
                />
              </n-space>

              <!-- Dog Breeds Grid -->
              <n-grid :x-gap="16" :y-gap="16" :cols="4" responsive="screen">
                <n-grid-item v-for="dog in filteredDogs" :key="dog.id">
                  <n-card
                    hoverable
                    :title="dog.attributes.name"
                    @click="selectDog(dog)"
                    style="cursor: pointer;"
                  >
                    <template #cover>
                      <div style="height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center;">
                        <n-icon size="80" :component="PawOutline" color="#fff" style="opacity: 0.5;" />
                      </div>
                    </template>
                    <n-space vertical :size="8">
                      <n-text depth="3">{{ dog.attributes.description?.substring(0, 100) }}...</n-text>
                      <n-space>
                        <n-tag type="info" size="small">{{ dog.attributes.life.min }}-{{ dog.attributes.life.max }} years</n-tag>
                        <n-tag type="success" size="small" v-if="dog.attributes.hypoallergenic">Hypoallergenic</n-tag>
                      </n-space>
                    </n-space>
                  </n-card>
                </n-grid-item>
              </n-grid>

              <n-empty v-if="filteredDogs.length === 0" description="No dogs found" />
            </n-space>
          </div>

          <!-- Selected Dog Details -->
          <div v-else-if="activeKey === 'dog-details' && selectedDogData">
            <n-space vertical :size="24">
              <n-button @click="activeKey = 'all-dogs'" type="primary" ghost>
                <template #icon>
                  <n-icon :component="ArrowBackOutline" />
                </template>
                Back to All Dogs
              </n-button>

              <n-card :title="selectedDogData.attributes.name">
                <n-space vertical :size="16">
                  <n-descriptions bordered :column="2">
                    <n-descriptions-item label="Life Span">
                      {{ selectedDogData.attributes.life.min }}-{{ selectedDogData.attributes.life.max }} years
                    </n-descriptions-item>
                    <n-descriptions-item label="Male Weight">
                      {{ selectedDogData.attributes.male_weight.min }}-{{ selectedDogData.attributes.male_weight.max }} kg
                    </n-descriptions-item>
                    <n-descriptions-item label="Female Weight">
                      {{ selectedDogData.attributes.female_weight.min }}-{{ selectedDogData.attributes.female_weight.max }} kg
                    </n-descriptions-item>
                    <n-descriptions-item label="Hypoallergenic">
                      <n-tag :type="selectedDogData.attributes.hypoallergenic ? 'success' : 'default'">
                        {{ selectedDogData.attributes.hypoallergenic ? 'Yes' : 'No' }}
                      </n-tag>
                    </n-descriptions-item>
                  </n-descriptions>

                  <div>
                    <h3>Description</h3>
                    <n-text>{{ selectedDogData.attributes.description }}</n-text>
                  </div>
                </n-space>
              </n-card>
            </n-space>
          </div>

          <!-- About Page -->
          <div v-else-if="activeKey === 'about'">
            <n-space vertical :size="24">
              <n-card title="About Dog House">
                <n-space vertical :size="16">
                  <p>Welcome to Dog House, your comprehensive guide to dog breeds from around the world!</p>
                  <p>We provide detailed information about different dog breeds, including their characteristics, temperament, and care requirements.</p>
                  <n-divider />
                  <h3>Features:</h3>
                  <ul>
                    <li>Browse over 200 dog breeds</li>
                    <li>Search and filter by various criteria</li>
                    <li>Learn about breed characteristics and requirements</li>
                    <li>Dark mode support for comfortable viewing</li>
                  </ul>
                </n-space>
              </n-card>
            </n-space>
          </div>

          <!-- Contact Page -->
          <div v-else-if="activeKey === 'contact'">
            <n-space vertical :size="24">
              <n-card title="Contact Us">
                <n-form>
                  <n-form-item label="Name">
                    <n-input placeholder="Your name" />
                  </n-form-item>
                  <n-form-item label="Email">
                    <n-input placeholder="your@email.com" />
                  </n-form-item>
                  <n-form-item label="Message">
                    <n-input type="textarea" placeholder="Your message..." :rows="5" />
                  </n-form-item>
                  <n-button type="primary">Send Message</n-button>
                </n-form>
              </n-card>
            </n-space>
          </div>
        </n-layout-content>
      </n-layout>

      <!-- Footer -->
      <n-layout-footer bordered :inverted="inverted" style="height: 64px; padding: 0 24px; display: flex; align-items: center; justify-content: center;">
        <n-text depth="3">© 2026 Dog House - All Rights Reserved</n-text>
      </n-layout-footer>
    </n-space>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'
import type { Component } from 'vue'
import {
  NConfigProvider,
  NSpace,
  NSwitch,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NMenu,
  NIcon,
  NCard,
  NGrid,
  NGridItem,
  NInput,
  NSelect,
  NTag,
  NText,
  NButton,
  NDescriptions,
  NDescriptionsItem,
  NSpin,
  NEmpty,
  NDivider,
  NForm,
  NFormItem,
  darkTheme
} from 'naive-ui'
import {
  PawOutline,
  BookOutline,
  PersonOutline,
  InformationCircleOutline,
  MailOutline,
  SearchOutline,
  ArrowBackOutline
} from '@vicons/ionicons5'

// Render icon helper
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// State
const inverted = ref(false)
const collapsed = ref(false)
const activeKey = ref('all-dogs')
const loading = ref(true)
const dogBreeds = ref<any[]>([])
const searchQuery = ref('')
const selectedGroup = ref(null)
const selectedDogData = ref<any>(null)

// Menu options
const menuOptions = [
  {
    label: 'All Dogs',
    key: 'all-dogs',
    icon: renderIcon(PawOutline)
  },
  {
    label: 'About',
    key: 'about',
    icon: renderIcon(InformationCircleOutline)
  },
  {
    label: 'Contact',
    key: 'contact',
    icon: renderIcon(MailOutline)
  }
]

// Group options for filter
const groupOptions = computed(() => {
  const groups = new Set<string>()
  dogBreeds.value.forEach(dog => {
    if (dog.relationships?.group?.data?.id) {
      groups.add(dog.relationships.group.data.id)
    }
  })
  return Array.from(groups).map(group => ({
    label: group.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    value: group
  }))
})

// Filtered dogs
const filteredDogs = computed(() => {
  let filtered = dogBreeds.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(dog =>
      dog.attributes.name.toLowerCase().includes(query) ||
      dog.attributes.description?.toLowerCase().includes(query)
    )
  }

  // Group filter
  if (selectedGroup.value) {
    filtered = filtered.filter(dog =>
      dog.relationships?.group?.data?.id === selectedGroup.value
    )
  }

  return filtered
})

// Fetch dog breeds
const fetchDogBreeds = async () => {
  try {
    loading.value = true
    const response = await fetch('https://dogapi.dog/api/v2/breeds')
    const data = await response.json()
    dogBreeds.value = data.data
  } catch (error) {
    console.error('Error fetching dog breeds:', error)
  } finally {
    loading.value = false
  }
}

// Handle menu selection
const handleMenuSelect = (key: string) => {
  activeKey.value = key
}

const selectDog = (dog: any) => {
  selectedDogData.value = dog
  activeKey.value = 'dog-details'
}

onMounted(() => {
  fetchDogBreeds()
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}
</style>