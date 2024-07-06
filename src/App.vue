<script setup lang="ts">
import { useYamlOutput } from '@/composable/useYamlOutput'
import Copy from '@/components/Copy.vue'
import Github from '@/components/Github.vue'

const { form, yaml } = useYamlOutput()

const copy = () => {
  navigator.clipboard.writeText(yaml.value)
}
</script>

<template>
  <main class="container py-12 lg:py-16">
    <h1 class="text-center text-xl md:text-3xl">
      <strong class="text-red-500">Laravel</strong> Github action generator
    </h1>
    <div class="gap-8 lg:mt-8 lg:grid lg:grid-cols-[2fr_3fr] xl:h-[53rem]">
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
        <fieldset class="mt-6">
          <legend>Triggers</legend>
          <div
            v-for="trigger in form.triggers"
            class="mt-3 flex items-center gap-2"
          >
            <input
              v-model="trigger.enabled"
              type="checkbox"
              :value="true"
              :id="trigger.type"
              class="size-5 rounded-md border-gray-200 shadow-sm"
            />
            <label :for="trigger.type" class="capitalize">
              {{ trigger.label }}
            </label>
          </div>
        </fieldset>
        <div class="mt-6">
          <label for="database">Database</label>
          <select
            v-model="form.database"
            id="database"
            class="mt-2 w-full rounded-md border border-gray-200 shadow-sm"
          >
            <option value="mysql">MySQL</option>
          </select>
        </div>
        <div class="mt-6">
          <label for="mysql_version">MySQL version</label>
          <select
            v-model="form.database_version"
            id="mysql_version"
            class="mt-2 w-full rounded-md border border-gray-200 shadow-sm"
          >
            <option value="8.0">8.0</option>
            <option value="5.7">5.7</option>
          </select>
        </div>
        <div class="mt-6">
          <label for="php_version">PHP version</label>
          <select
            v-model="form.php_version"
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
            v-model="form.node_version"
            id="node_version"
            class="mt-2 w-full rounded-md border border-gray-200 shadow-sm"
          >
            <option value="20">20</option>
            <option value="18">18</option>
          </select>
        </div>
        <fieldset class="mt-6">
          <legend>Test</legend>
          <div class="mt-3 flex items-center gap-2">
            <input
              v-model="form.test"
              type="radio"
              :value="null"
              id="no_test"
              class="size-5 border-gray-200 shadow-sm"
            />
            <label for="no_test">No tests</label>
          </div>
          <div class="mt-3 flex items-center gap-2">
            <input
              v-model="form.test"
              type="radio"
              value="phpunit"
              id="phpunit"
              class="size-5 border-gray-200 shadow-sm"
            />
            <label for="phpunit">PHPUnit</label>
          </div>
          <div class="mt-3 flex items-center gap-2">
            <input
              v-model="form.test"
              type="radio"
              value="pest"
              id="pest"
              class="size-5 border-gray-200 shadow-sm"
            />
            <label for="pest">Pest</label>
          </div>
        </fieldset>
        <fieldset class="mt-6">
          <legend>Static analysis</legend>
          <div class="mt-3 flex items-center gap-2">
            <input
              v-model="form.static_analysis"
              type="radio"
              :value="null"
              id="no_static_analysis"
              class="size-5 border-gray-200 shadow-sm"
            />
            <label for="no_static_analysis">No static analysis</label>
          </div>
          <div class="mt-3 flex items-center gap-2">
            <input
              v-model="form.static_analysis"
              type="radio"
              value="larastan"
              id="larastan"
              class="size-5 border-gray-200 shadow-sm"
            />
            <label for="larastan">Larastan</label>
          </div>
        </fieldset>
      </form>
      <div
        class="relative mt-6 overflow-x-auto rounded-md border border-gray-200 bg-white px-4 py-4 shadow-sm lg:mt-0"
      >
        <pre
          class="h-full w-full"
        ><code class="font-fira-code">{{ yaml }}</code></pre>
        <button
          @click="copy"
          type="button"
          class="absolute right-8 top-5 inline-flex gap-1 rounded-full bg-blue-500 py-2 pl-3 pr-4 font-sans font-bold text-white hover:bg-opacity-85"
        >
          <Copy />
          Copy
        </button>
      </div>
    </div>
  </main>
  <a
    href="https://github.com/LeeConnelly12/laravel-github-action-generator"
    class="fixed right-10 top-6 hidden sm:block"
  >
    <Github />
  </a>
</template>
