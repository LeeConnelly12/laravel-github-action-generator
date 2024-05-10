<script setup lang="ts">
import { computed, ref } from 'vue'
import { Form } from '@/types/Form'
import { stringify } from 'yaml'

const form = ref<Form>({
  name: 'my workflow',
  triggers: [],
  database: 'mysql',
  database_version: 8.0,
  php_version: 8.3,
  node_version: 20,
  tests: [],
  static_analysis: [],
  deployment: 'digital_ocean',
})

const yaml = computed(() => {
  return {
    name: form.value.name,
  }
})
</script>

<template>
  <main class="px-6 pb-12 pt-12">
    <h1 class="text-center text-xl">
      <strong class="text-red-500">Laravel</strong> Github action generator
    </h1>
    <form class="mt-6">
      <div>
        <label for="name">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="mt-2 w-full rounded-md border border-gray-200 shadow-sm"
          placeholder="Enter name"
        />
      </div>
      <div class="mt-6">
        <p>Triggers</p>
        <div class="mt-3 grid gap-3">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              name="triggers"
              value="on_push"
              id="on_push"
            />
            <span>On push</span>
          </label>
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              name="triggers"
              value="on_pull_request"
              id="on_pull_request"
            />
            <span>On pull request</span>
          </label>
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              name="triggers"
              value="on_schedule"
              id="on_schedule"
            />
            <span>On schedule</span>
          </label>
        </div>
      </div>
      <div class="mt-6">
        <label for="database">Database</label>
        <select
          name="database"
          id="database"
          class="mt-2 w-full rounded-md border border-gray-200 shadow-sm"
        >
          <option value="mysql">MySQL</option>
        </select>
      </div>
      <div class="mt-6">
        <label for="mysql_version">MySQL version</label>
        <select
          name="mysql_version"
          id="mysql_version"
          class="mt-2 w-full rounded-md border border-gray-200 shadow-sm"
        >
          <option value="8.0">8.0</option>
        </select>
      </div>
      <div class="mt-6">
        <label for="php_version">PHP version</label>
        <select
          name="php_version"
          id="php_version"
          class="mt-2 w-full rounded-md border border-gray-200 shadow-sm"
        >
          <option value="8.3">8.3</option>
          <option value="8.2">8.2</option>
          <option value="8.1">8.1</option>
        </select>
      </div>
      <div class="mt-6">
        <label for="node_versions">Node versions</label>
        <select
          name="node_versions"
          id="node_versions"
          class="mt-2 w-full rounded-md border border-gray-200 shadow-sm"
        >
          <option value="20">20</option>
        </select>
      </div>
      <div class="mt-6">
        <p>Tests</p>
        <div class="mt-3 grid gap-3">
          <label class="flex items-center gap-2">
            <input type="checkbox" name="tests" value="phpunit" />
            <span>PHPUnit</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" name="tests" value="pest" />
            <span>Pest</span>
          </label>
        </div>
      </div>
      <div class="mt-6">
        <p>Static analysis</p>
        <div class="mt-3 grid gap-3">
          <label class="flex items-center gap-2">
            <input type="checkbox" name="static_analysis" value="larastan" />
            <span>Larastan</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" name="static_analysis" value="phpstan" />
            <span>PHPStan</span>
          </label>
        </div>
      </div>
      <div class="mt-6">
        <label for="deployment">Deployment</label>
        <select
          name="deployment"
          id="deployment"
          class="mt-2 w-full rounded-md border border-gray-200 shadow-sm"
        >
          <option value="digital_ocean">Digital Ocean</option>
        </select>
      </div>
    </form>
    <div
      class="mt-6 w-full rounded-md border border-gray-200 bg-white px-3 py-4 shadow-sm"
    >
      <p>{{ stringify(yaml) }}</p>
    </div>
  </main>
</template>
