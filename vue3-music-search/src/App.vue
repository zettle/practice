<template>
    <div class="app">
        <!-- 搜索输入框 -->
        <div class="search-input">
            <i class="iconfont icon-search"></i>
            <input type="text" placeholder="搜索歌曲" />
            <i class="iconfont icon-del"></i>
        </div>

        <!-- 搜索历史 + 热搜榜 -->
        <template>
            <div class="search-history">
                <div class="search-history-head">
                    <span>历史记录</span>
                    <i class="iconfont icon-del1"></i>
                </div>
                <ul class="search-history-list">
                    <li>少年</li>
                    <li>如果遇到他</li>
                </ul>
            </div>
            <div class="search-hot">
                <div class="search-hot-head">热搜榜</div>
                <div class="search-hot-item">
                    <div class="search-hot-top">1</div>
                    <div class="search-hot-word">
                        <section>少年 <i class="iconfont icon-HOT"></i></section>
                        <section>少年这个吃世纪东方款</section>
                    </div>
                    <span class="search-hot-count">123</span>
                </div>
                <div class="search-hot-item">
                    <div class="search-hot-top">1</div>
                    <div class="search-hot-word">
                        <section>少年 <i class="iconfont icon-HOT"></i></section>
                        <section>少年这个吃世纪东方款</section>
                    </div>
                    <span class="search-hot-count">123</span>
                </div>
            </div>
        </template>

        <!-- 搜索匹配到的关键词 -->
        <!-- <div class="search-suggest">
            <div class="search-suggest-head">搜索“少年”</div>
            <div class="search-suggest-item">
                <i class="iconfont icon-search"></i>少年抖音
            </div>
            <div class="search-suggest-item">
                <i class="iconfont icon-search"></i>少年抖音
            </div>
        </div> -->

        <!-- 搜索匹配到的列表 -->
        <!-- <div class="search-result">
            <div class="search-result-item">
                <div class="search-result-word">
                    <p>少年</p>
                    <p>许巍-爱如少年</p>
                </div>
                <i class="iconfont icon-bofang"></i>
            </div>
            <div class="search-result-item">
                <div class="search-result-word">
                    <p>少年</p>
                    <p>许巍-爱如少年</p>
                </div>
                <i class="iconfont icon-bofang"></i>
            </div>
        </div> -->
    </div>
</template>

<script lang="ts">
import '@/assets/font/iconfont.css';
import { defineComponent} from "vue";
export default defineComponent({
    setup() {
        
    },
});
</script>
<style>
* { margin: 0; padding: 0; }
</style>
<style lang="scss" scoped>
// 搜索输入框
.search-input {
    display: flex;
    align-items: center;
    height: 35px;
    margin: 35px 15px 25px 15px;
    background: #f7f7f7;
    border-radius: 25px;

    i {
        margin: 0 13px;
    }

    input {
        flex: 1;
        font-size: 14px;
        border: none;
        background: #f7f7f7;
        outline: none;
    }

    .icon-del {
        color: #ccc;
        font-size: 10px;
    }
}

// 搜索历史
.search-history {
    margin: 0 15px 25px 15px;
    font-size: 14px;

    .search-history-head {
        display: flex;
        justify-content: space-between;
        margin-bottom: 18px;
    }

    .search-history-list {
        display: flex;
        flex-wrap: wrap;

        li {
            list-style: none;
            padding: 8px 14px;
            border-radius: 20px;
            margin-right: 15px;
            margin-bottom: 15px;
            background: #f7f7f7;
        }
    }
}

// 热搜
.search-hot {
    margin: 0 15px;
    font-size: 14px;

    .search-hot-head {
        margin-bottom: 18px;
    }

    .search-hot-item {
        display: flex;
        align-items: center;
        margin-bottom: 29px;
    }
    .search-hot-top {
        color: #fb2222;
        width: 30px;
        margin-left: 4px;
    }

    .search-hot-word {
        flex: 1;
        section:nth-child(1) {
            font-size: 16px;
            color: black;
        }
        section:nth-child(2) {
            font-size: 12px;
            color: #878787;
        }

        .icon-HOT {
            color:#fb2222;
            font-size: 22px;
        }

        .search-hot-count {
            color: #878787;
        }
    }
}

// 搜索匹配到的关键词
.search-suggest {
    border-top: 1px #e4e4e4 solid;
    padding: 15px;
    font-size: 14px;

    .search-suggest-head {
        color: #4574a5;
        margin-bottom: 37px;
    }

    .search-suggest-item {
        color: #5d5d5d;
        margin-bottom: 37px;
    }

    i {
        color: #bdbdbd;
        margin-right: 14px;
        position: relative;
        top: 1px;
    }
}


// 搜索匹配到的歌曲列表
.search-result {
    border-top: 1px #e4e4e4 solid;
    padding: 15px;
    .search-result-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px #e4e4e4 solid;
    }
    .icon-bofang {
        font-size: 22px;
    }
    .search-result-word {
        p:nth-child(1) {
            font-size: 16px;
            color: #235790;
            margin-bottom: 6px;
        }
        p:nth-child(2) {
            font-size: 14px;
            color: #898989;
        }

        i {
            font-size: 30px;
            color: #878787;
        }
    }
}
</style>