---
layout: doc
title: 正在跳转...
description: 正在跳转到文档快速开始页面。
---

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()

onMounted(() => {
  router.go('/zh/install/container-install')
})
</script>

<meta http-equiv="refresh" content="0; url=/zh/install/container-install">

正在跳转到文档入口页...
