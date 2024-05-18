<script setup>
import { useDayjs } from '#dayjs'
const dayjs = useDayjs()
const createSuccess = useCreateSuccess()
</script>
<template>
  <div>
    <CreateSteps :step="3" />
    <div class="container py-10">
      <h1 class="mb-8 text-3xl font-bold">提案發起成功</h1>
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-3">
        <div class="xl:col-span-2">
          <ul>
            <li class="mb-6">
              <div class="font-bold">提案標題：</div>
              <p>{{ createSuccess.project.title }}</p>
            </li>
            <li class="mb-6">
              <div class="font-bold">提案人名稱：</div>
              <p>{{ createSuccess.project.teamName }}</p>
            </li>
            <li class="mb-6">
              <div class="font-bold">提案發起日期：</div>
              <p>
                {{ dayjs(createSuccess.project.startDate * 1000).format('YYYY/MM/DD') }}
                至
                {{ dayjs(createSuccess.project.endDate * 1000).format('YYYY/MM/DD') }}
              </p>
            </li>
            <li>
              <div class="font-bold">目標金額：</div>
              <p>{{ priceFormat(createSuccess.project.targetMoney) }}</p>
            </li>
          </ul>
          <div class="mt-10 bg-secondary-2 p-6 text-white">
            已將您的提案申請送出，我們將在 7 - 10
            個工作天內完成提案審核，並將審核結果已通知的形式告知。
          </div>
        </div>
        <div>
          <ProjectCard :project="createSuccess.project" />
        </div>
      </div>
    </div>
  </div>
</template>
