<template>
  <!-- router-link是跳转路由的标签 -->
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link> |
  <router-link to="/name">name</router-link>

  <!-- router-view负责展示当前路由对应的组件内容 -->
  <router-view />
</template>

<style>
</style>
