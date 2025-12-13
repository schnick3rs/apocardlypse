<script setup lang="ts">
import type {AbstractCard} from "~~/types/cards";

const { card } = defineProps<{ card: AbstractCard }>();

const cardImage = computed(() => {
  if (card.imageUrl) {
    return { backgroundImage: `url(${card.imageUrl})` };
  }
  return null;
});

</script>

<template>
  <article class="card cutter">

    <!-- card specific background image -->
    <div v-if="card.imageUrl" class="layer layer-image" :style="cardImage"></div>

    <!-- card Stain -->
    <div class="layer layer-stain"></div>

    <!-- frame -->

    <div v-if="card.cost !== undefined" class="cost bg-amber-200 shadow-lg shadow-amber-200/50 rounded-full w-8 h-8 flex items-center justify-center font-mono">{{ card.cost }}</div>
    <div v-if="card.name" class="name w-3/4 ml-12 px-2 py-1 bg-cyan-900 shadow-lg shadow-cyan-900/50 rounded-sm">{{ card.name }}</div>

    <div class="tags w-full absolute top-46 text-xs text-center">
      {{card.tags.join(' · ')}}
    </div>

    <div v-if="card.text" class="text p-2 w-full">{{ card.text }}</div>

    <div
        v-if="card.layout === 'Plan'"
        class="stats flex items-center justify-center font-mono w-full p-2 text-sm"
    >
      <div class="stat-wrap mx-2 flex flex-col items-center">
        <div class="stat px-4 bg-fuchsia-400 shadow-lg shadow-fuchsia-300/50 rounded-sm">
          {{ card.planning }}
        </div>
        <div class="label text-[10px] mt-0.5 opacity-70">Plan</div>
      </div>
    </div>

    <div
      v-if="card.layout === 'Ally'"
      class="stats flex items-center justify-center font-mono w-full p-2 text-sm"
    >
      <div class="stat-wrap mx-2 flex flex-col items-center">
        <div class="stat px-4 bg-red-400 shadow-lg shadow-red-400/50 rounded-sm">
          {{ card.stats.ang }}
        </div>
        <div class="label text-[10px] mt-0.5 opacity-70">ANG</div>
      </div>

      <div class="stat-wrap mx-2 flex flex-col items-center">
        <div class="stat px-4 bg-yellow-400 shadow-lg shadow-yellow-400/50 rounded-sm">
          {{ card.stats.int }}
        </div>
        <div class="label text-[10px] mt-0.5 opacity-70">INT</div>
      </div>

      <div class="stat-wrap mx-2 flex flex-col items-center">
        <div class="stat px-4 bg-blue-400 shadow-lg shadow-blue-400/50 rounded-sm">
          {{ card.stats.fok }}
        </div>
        <div class="label text-[10px] mt-0.5 opacity-70">FOK</div>
      </div>

      <div class="stat-wrap mx-2 flex flex-col items-center">
        <div class="stat px-4 bg-green-400 shadow-lg shadow-green-400/50 rounded-sm">
          {{ card.stats.aus }}
        </div>
        <div class="label text-[10px] mt-0.5 opacity-70">AUS</div>
      </div>
    </div>


    <div class="w-full absolute bottom-0 text-xs text-center">
      {{card.sourceName}} · lvl {{card.sourceLevel}} · {{card.sourceType}}
    </div>

  </article>
</template>

<style scoped>
:root{
  --badge-padding: 0.35rem 0.7rem;
  --badge-radius: 10px;            /* slightly round */
  --badge-font-size: 0.9rem;
  --badge-shadow: 0 6px 18px rgba(0,0,0,0.18); /* drop shadow */
  --badge-text-shadow: 0 1px 0 rgba(0,0,0,0.15);
}

.card {
  overflow: hidden;
  position: relative;
  float: left;
  display: block;
  page-break-inside: avoid;

  height: 88mm;
  width: 63.5mm;
}

.card.cutter {
  border-color: red;
  border-width: 0.2mm;
  border-style: dashed;
  width: 63.1mm;
  height: 87.6mm;
}

.layer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  &--blend {
    clip-path: inset(1.5mm 1.5mm 1.5mm 1.5mm round 3mm);
  }

  &--modifer {
    left: -0.7mm;
  }
}

.layer-image {
  position: absolute;
  top: 15mm;
  height: 50%;
}

.layer-stain {
  background-image: url('/img/stain-center-medium.png');
}

.cost {
  position: absolute;
  top: 2mm;
  left: 2mm;
}

.name {
  position: absolute;
  top: 2mm;
  line-height: 1;                 /* keeps it single-line */
  white-space: nowrap;            /* force single line */

  color: white;
}

.text {
  position: absolute;
  top: 53mm;
  left: 0;
  font-size: 3.2mm;
  line-height: 3.6mm;
}

.plan {
  position: absolute;
  top: 72mm;
}

.stats {
  position: absolute;
  top: 72mm;
}

.stats .stat {

}

</style>
