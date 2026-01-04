<script setup lang="ts">
import type {AbstractCard} from "~~/types/cards";

const { card, scale } = defineProps<{ card: AbstractCard, scale: number }>();

const cardImage = computed(() => {
  if (card.imageUrl) {
    return {
      backgroundImage: `url(${card.imageUrl})`,
      top: `${11 * scale}mm`
    }
  }
  const placeholderImageUrl = `/img/placeholder-rest.jpg`
  return {
    backgroundImage: `url(${placeholderImageUrl})`,
    top: `${11 * scale}mm`
  }
})

const cardDimensions = computed(() => {
  return {
    height: `${88*scale}mm`,
    width: `${63.2*scale}mm`,
    fontSize: `${3.2*scale}mm`,
  }
})

const nameStyle = computed(() => {
  return {
    top: `${2*scale}mm`,
    fontSize: `${4*scale}mm`,
    padding: `${2*scale}mm ${3*scale}mm`,
  }
})

const tagsStyle = computed(() => {
  return {
    top: `${45*scale}mm`,
    fontSize: `${3.2*scale}mm`,
  }
})


const textStyle = computed(() => {
  return {
    top: `${49*scale}mm`,
    fontSize: `${3.2*scale}mm`,
    lineHeight: `${3.6*scale}mm`,
    padding: `${2*scale}mm`,
  }
})

const statsContainerStyle = computed(() => {
  return {
    top: `${72*scale}mm`,
    fontSize: `${3.2*scale}mm`,
    padding: `${2*scale}mm`,
  }
})

const statWrapperStyle = computed(() => {
  return {
    margin: `0 ${2*scale}mm`,
  }
})

const statStyle = computed(() => {
  return {
    padding: `0 ${4*scale}mm`,
  }
})

const statLabelStyle = computed(() => {
  return {
    marginTop: `${0.4*scale}mm`,
    fontSize: `${3*scale}mm`,
  }
})

const footerStyle = computed(() => {
  return {
    bottom: 0,
    fontSize: `${2.8*scale}mm`,
  }
})
</script>

<template>
  <article class="card" :style="cardDimensions">

    <!-- card specific background image -->
    <div class="layer layer-image" :style="cardImage"></div>

    <!-- card Stain -->
    <div class="layer layer-stain--top"></div>
    <div class="layer layer-stain--bottom"></div>

    <!-- frame -->

    <div v-if="card.name" class="name w-full bg-cyan-900 shadow-lg shadow-cyan-900/50 " :style="nameStyle">{{ card.name }}</div>

    <div class="tags w-full absolute text-center font-bold" :style="tagsStyle">
      {{card.tags.join(' · ')}}
    </div>

    <div v-if="card.text" class="text w-full" :style="textStyle">{{ card.text }}</div>

    <div
        v-if="card.layout === 'Plan'"
        class="stats flex items-center justify-center font-mono w-full"
        :style="statsContainerStyle"
    >
      <div class="stat-wrap flex flex-col items-center" :style="statWrapperStyle">
        <div class="stat bg-violet-800 text-white shadow-lg shadow-violet-800/50 rounded-sm" :style="statStyle">
          {{ card.planning }}
        </div>
        <div class="label opacity-70" :style="statLabelStyle">Plan</div>
      </div>
    </div>

    <div
      class="stats flex items-center justify-center font-mono w-full"
      :style="statsContainerStyle"
    >

      <div class="stat-wrap flex flex-col items-center" :style="statWrapperStyle">
        <div class="stat bg-red-600 shadow-lg shadow-red-600/50 rounded-sm text-white" :style="statStyle">
          {{ card.stats.erh }}
        </div>
        <div class="label opacity-70" :style="statLabelStyle">ERH</div>
      </div>
    </div>


    <div class="footer w-full absolute text-center" :style="footerStyle">
      Handlimit 6 · AUSdauer {{card.stats.aus}}
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
  height: 47%;
}

.layer-stain {
  background-image: url('/img/stain-center-medium.png');
}

.layer-stain--top {
  background-image: url('/img/stain-top-medium.png');
}

.layer-stain--bottom {
  background-image: url('/img/stain-bottom-small.png');
}

.cost {
  position: absolute;
  top: 2mm;
  left: 2mm;
}

.name {
  position: absolute;
  line-height: 1;                 /* keeps it single-line */
  white-space: nowrap;            /* force single line */

  color: white;
}

.text {
  position: absolute;
  left: 0;
}

.stats {
  position: absolute;
}

</style>
