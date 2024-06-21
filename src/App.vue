<script setup lang="ts">
import { computed, ref } from 'vue'
import { Form } from '@/types/Form'
import { Output } from '@/types/Output'
import { stringify } from 'yaml'
import { set } from 'lodash-es'

const form = ref<Form>({
  name: 'my workflow',
  triggers: [
    {
      enabled: false,
      type: 'on push',
    },
    {
      enabled: false,
      type: 'on pull request',
    },
  ],
  database: 'mysql',
  database_version: 8.0,
  php_version: 8.3,
  node_version: 20,
  tests: [],
  static_analysis: [],
  deployment: 'digital_ocean',
})

const yaml = computed(() => {
  const output: Output = {
    name: form.value.name,
  }

  form.value.triggers
    .filter((trigger) => trigger.enabled)
    .forEach((trigger) => {
      if (trigger.type == 'on push') {
        set(output, 'on.push.branches', ['main'])
      }

      if (trigger.type == 'on pull request') {
        set(output, 'on.pull_request.branches', ['main'])
      }
    })

  return stringify(output)
})
</script>

<template>
  <main class="container mx-auto px-6 py-12 lg:max-w-6xl lg:py-16">
    <h1 class="text-center text-xl md:text-3xl">
      <strong class="text-red-500">Laravel</strong> Github action generator
    </h1>
    <div class="gap-8 lg:mt-8 lg:grid lg:grid-cols-2 xl:grid-cols-[2fr_3fr]">
      <form class="mt-6 lg:mt-0">
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
            <label
              v-for="trigger in form.triggers"
              class="flex items-center gap-2"
            >
              <input
                v-model="trigger.enabled"
                type="checkbox"
                :value="true"
                id="on_push"
              />
              <span>{{ trigger.type }}</span>
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
          <label for="node_version">Node version</label>
          <select
            name="node_version"
            id="node_version"
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
      <pre
        class="mt-6 w-full rounded-md border border-gray-200 bg-white px-4 py-4 shadow-sm lg:mt-0"
      ><code class="font-fira-code">{{ yaml }}</code></pre>
    </div>
  </main>
</template>
