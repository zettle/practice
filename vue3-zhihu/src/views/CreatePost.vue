<template>
    <div class="create-post-page">
        <h4>编辑文章</h4>
        <!-- 上传区域 -->
        <div class="file-upload">
            <div class="file-upload-container">
                <!-- 还没上传 -->
                <button class="btn btn-primary">点击上传</button>
                <!-- loading -->
                <!-- <div class="d-flex">
                    <div class="spinner-border text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <h2>正在上传</h2>
                </div> -->
                <!-- 上传完成 -->
                <!-- <div class="uploaded-area">
                    <img src="https://img.alicdn.com/tfs/TB1P3dsZUY1gK0jSZFCXXcwqXXa-290-130.gif">
                    <h3>点击重新上传</h3>
                </div> -->
            </div>
            <input
                ref="fileInput"
                type="file"
                class="file-input d-none"
                @change="handleFileChange">
        </div>

        <!-- 表单区域 -->
        <form class="validate-form-container">
            <div class="submit-area">
                <div class="mb-3">
                    <label class="form-label">文章标题</label>
                    <input class="form-control" placeholder="请输入文章标题" type="text" />
                </div>
                <div class="mb-3">
                    <label class="form-label">文章详情</label>
                    <textarea class="form-control" placeholder="请输入密码"></textarea>
                </div>
            </div>
            <div class="submit-area">
                <button type="submit" class="btn btn-primary btn-block btn-large">发表文章</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({

});
</script>

<style lang="scss" scoped>
.create-post-page .file-upload-container {
    height: 200px;
    cursor: pointer;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.uploaded-area {
    position: relative;
}
.uploaded-area:hover h3 {
    display: block;
}
.uploaded-area h3 {
    display: none;
    position: absolute;
    color: #999;
    text-align: center;
    width: 100%;
    top: 50%;
}
</style>
