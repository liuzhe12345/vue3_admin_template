<template>
    <el-card style="height: 80px;">
        <el-form :inline="true" class="form">
            <el-form-item label="学生姓名:">
                <el-input placeholder="请你输入搜索学生姓名" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" :disabled="keyword ? false : true" @click="search">搜索</el-button>
                <el-button type="primary" size="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
        <el-button type="primary" size="default" :disabled="selectIdArr.length ? false : true"
            @click="deleteSelectUser">批量删除</el-button>
        <!-- table展示用户信息 -->
        <el-table @selection-change="selectChange" style="margin: 10px 0px;" border :data="userArr">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="设备ID" align="center" prop="id"></el-table-column>
            <el-table-column label="用户名字" align="center" prop="username" show-overflow-tooltip></el-table-column>
            <!--<el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column>-->
            <!-- <el-table-column label="用户身份" align="center" prop="roleName" show-overflow-tooltip></el-table-column> -->
            <el-table-column label="学号/工号" align="center" prop="studentnumber" show-overflow-tooltip></el-table-column>
            <el-table-column label="学生班级" align="center" prop="classnumber" show-overflow-tooltip></el-table-column>
            <el-table-column label="学生定位" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="定位更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" icon="User" @click="setRole(row)">更换设备</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>
                    <el-popconfirm :title="`你确定要删除${row.username}?`" width="260px" @confirm="deleteUser(row.id)">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[11, 20, 50, 100]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" @current-change="getHasUser"
            @size-change="handler" />
    </el-card>
    <!-- 抽屉结构:完成添加新的用户账号|更新已有的账号信息 -->
    <el-drawer v-model="drawer">
        <!-- 头部标题:将来文字内容应该动态的 -->
        <template #header>
            <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
        </template>
        <!-- 身体部分 -->
        <template #default>
            <el-form :model="userParams" :rules="rules" ref="formRef">
                <el-form-item label="用户姓名" prop="username">
                    <el-input placeholder="请您输入用户姓名" v-model="userParams.username"></el-input>
                </el-form-item>
                <el-form-item label="用户身份" prop="roleName">
                    <el-select v-model="userParams.roleName" placeholder="请选择身份">
                        <el-option label="学生" value="学生"></el-option>
                        <el-option label="教师" value="教师"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
                    <el-input placeholder="请您输入用户密码" v-model="userParams.password"></el-input>
                </el-form-item>
                <el-form-item label="用户电话" prop="phone">
                    <el-input placeholder="请您输入电话号码" v-model="userParams.phone"></el-input>
                </el-form-item>
                <el-form-item label="用户性别" prop="sex">
                    <el-select v-model="userParams.sex" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="学生班级" prop="classnumber">
                    <el-input placeholder="请学生输入班级号" v-model="userParams.classnumber"></el-input>
                </el-form-item>
                
                <el-form-item label="用户学号/工号" prop="studentnumber">
                    <el-input placeholder="请您输入学号/工号" v-model="userParams.studentnumber"></el-input>
                </el-form-item>

                <el-upload class="upload-demo" action="" 
                           :on-change="handleChange" 
                           :on-exceed="handleExceed" 
                           :on-remove="handleRemove" 
                           :file-list="fileListUpload" 
                           accept=".csv" 
                           :auto-upload="false">
                    <el-button size="large" type="primary">批量注册</el-button>
                </el-upload>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </div>
        </template>
    </el-drawer>
    <!-- 抽屉结构:用户某一个已有的账号进行职位分配 -->
    <el-drawer v-model="drawer1">
        <template #header>
            <h4>更换设备</h4>
        </template>
        <template #default>
            <el-form>
                <el-form-item label="用户姓名">
                    <el-input v-model="userParams.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户设备">
                    
                    <!-- 显示职位的的复选框 -->
                    <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="(role, index) in allRole" :key="index" :label="role">{{ role.id
                        }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawer1 = false">取消</el-button>
                <el-button type="primary" @click="confirmClick">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>
<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import { ref, defineComponent, onMounted, reactive, nextTick } from 'vue';
import { reqSelectUser, reqRemoveUser, reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetUserRole } from '@/api/acl/user'
import type { SetRoleData, UserResponseData, Records, User, AllRoleResponseData, AllRole } from '@/api/acl/user/type';
import Papa from 'papaparse';
import ElMessage from "element-plus";

   
//默认页码
let pageNo = ref<number>(1);
//一页展示几条数据
let pageSize = ref<number>(11);
//用户总个数
let total = ref<number>(0);
//存储全部用户的数组
let userArr = ref<Records>([]);
//定义响应式数据控制抽屉的显示与隐藏
let drawer = ref<boolean>(false);
//控制分配角色抽屉显示与隐藏
let drawer1 = ref<boolean>(false);
//存储全部职位的数据
let allRole = ref<AllRole>([]);
//当前用户已有的职位
let userRole = ref<AllRole>([]);
//收集用户信息的响应式数据
let userParams = reactive<User>({
username: '',
password: '',
});
//准备一个数组存储批量删除的用户的ID
let selectIdArr = ref<User[]>([]);
//获取form组件实例
let formRef = ref<any>();
//定义响应式数据:收集用户输入进来的关键字
let keyword = ref<string>('');
//获取模板setting仓库
let settingStore = useLayOutSettingStore();
//组件挂载完毕
onMounted(() => {
    getHasUser();
});
const usersData = ref<User[]>([]); // 用于存储解析后的用户数据
//用于获取 CSV 内容的
const GetHasUsers = async (): Promise<string> => {
  const response = await fetch('/api/get-users-csv'); // 这里替换为实际的 API 路径
  if (!response.ok) {
    throw new Error('网络错误');
  }
  return await response.text(); // 返回 CSV 字符串
};
// 使用 PapaParse 来解析 CSV 内容
const handleChange = (csvContent:string ) => {
  Papa.parse(csvContent, {
    header: true, // 是否将第一行作为表头
    skipEmptyLines: true, // 跳过空行
    complete: (results) => {
      // 成功解析后，结果在 results.data 中
      // 可以根据你的需求进一步处理数据
      usersData.value = results.data as User[];
      console.log('Parsed Users Data:', usersData.value);
    },
    error: (error: any) => {
      console.error('Error parsing CSV:', error);
    },
  });
};
// 获取 CSV 数据的方法
const getCsvData = async () => {
  try {
    const csvContent = await GetHasUsers(); // 获取 CSV 字符串
    handleChange(csvContent); // 处理 CSV 字符串
  } catch (error) {
    console.error('Error fetching CSV data:', error);
  }
};
//获取全部已有的用户信息
const getHasUser = async (pager = 1) => {
    //收集当前页码
    pageNo.value = pager;
    let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value, keyword.value);
    if (result.code == 200) {
        total.value = result.data.total;
        userArr.value = result.data.records;
    }
}
//分页器下拉菜单的自定义事件的回调
const handler = () => {
    getHasUser();
}
//添加用户按钮的回调
const addUser = () => {
    //抽屉显示出来
    drawer.value = true;
    //清空数据
    Object.assign(userParams, {
        id: 0,
        username: '',
        name: '',
        password: ''
    });
    //清除上一次的错误的提示信息
    nextTick(() => {
        formRef.value.clearValidate('username');
        formRef.value.clearValidate('name');
        formRef.value.clearValidate('password');
    });
}
//更新已有的用户按钮的回调
//row:即为已有用户的账号信息
const updateUser = (row: User) => {
    //抽屉显示出来
    drawer.value = true;
    //存储收集已有的账号信息
    Object.assign(userParams, row);
    //清除上一次的错误的提示信息
    nextTick(() => {
        formRef.value.clearValidate('username');
        formRef.value.clearValidate('name');
    });
}
//保存按钮的回调
const save = async () => {
    //点击保存按钮的时候,务必需要保证表单全部复合条件在去发请求
    await formRef.value.validate()
    //保存按钮:添加新的用户|更新已有的用户账号信息
    let result: any = await reqAddOrUpdateUser(userParams);
    //添加或者更新成功
    if (result.code == 200) {
        //关闭抽屉
        drawer.value = false;
        //提示消息
        ElMessage({ type: 'success', message: userParams.id ? '更新成功' : '添加成功' });
        //获取最新的全部账号的信息
        // getHasUser(userParams.id ? pageNo.value : 1);
        //浏览器自动刷新一次
        window.location.reload();
    } else {
        //关闭抽屉
        drawer.value = false;
        //提示消息
        ElMessage({ type: 'error', message: userParams.id ? '更新失败' : '添加失败' });
    }
}
//取消按钮的回调
const cancel = () => {
    //关闭抽屉
    drawer.value = false;
}
//校验用户名字回调函数
const validatorUsername = (rule: any, value: any, callBack: any) => {
    //用户名字|昵称,长度至少五位
    if (value.trim().length >= 5) {
        callBack();
    } else {
        callBack(new Error('用户名字至少五位'))
    }
}
//校验用户名字回调函数
const validatorRoleName = (rule: any, value: any, callBack: any) => {
    //用户名字|昵称,长度至少五位
    if (value.trim().length = 2) {
        callBack();
    } else {
        callBack(new Error('请选择身份'))
    }
}
const validatorPassword = (rule: any, value: any, callBack: any) => {
    //用户密码长度至少六位
    if (value.trim().length >= 6) {
        callBack();
    } else {
        callBack(new Error('用户密码至少六位'))
    }
}
const validatorPhone = (rule: any, value: any, callBack: any) => {
    //用户手机号至少11位
    if (value.trim().length >= 11) {
        callBack();
    } else {
        callBack(new Error('请填写真实手机号'))
    }
}
const validatorStudentnumber = (rule: any, value: any, callBack: any) => {
    //用户工号至少6位
    if (value.trim().length >= 6) {
        callBack();
    } else {
        callBack(new Error('请填写真实学号/工号'))
    }
}
const validatorSex = (rule: any, value: any, callBack: any) => {
    //用户性别
    if (value= "男"||"女") {
        callBack();
    } else {
        callBack(new Error('请选择性别'))
    }
}

//表单校验的规则对象
const rules = {
    //用户名字
    username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
    //用户的密码
    password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
    //用户身份
    roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
    //用户手机号
    phone: [{ required: true, trigger: 'blur', validator: validatorPhone }],
    sex: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
    studentnumber: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}
//分配角色按钮的回调
const setRole = async (row: User) => {
    //存储已有的用户信息
    Object.assign(userParams, row);
    //获取全部的职位的数据与当前用户已有的职位的数据
    let result: AllRoleResponseData = await reqAllRole((userParams.id as number));
    if (result.code == 200) {
        //存储全部的职位
        allRole.value = result.data.allRolesList;
        //存储当前用户已有的职位
        userRole.value = result.data.assignRoles;
        //抽屉显示出来
        drawer1.value = true;
    }

}

//收集顶部复选框全选数据
const checkAll = ref<boolean>(false);

//确定按钮的回调(分配职位)
const confirmClick = async () => {
    //收集参数
    let data: SetRoleData = {
        userId: (userParams.id as number),
        roleIdList: userRole.value.map(item => {
            return (item.id as number)
        })
    }
    //分配用户的职位
    let result: any = await reqSetUserRole(data);
    if (result.code == 200) {
        //提示信息
        ElMessage({ type: 'success', message: '分配设备成功' });
        //关闭抽屉
        drawer1.value = false;
        //获取更新完毕用户的信息,更新完毕留在当前页
        getHasUser(pageNo.value);

    }
}

//删除某一个用户
const deleteUser = async (userId: number) => {
    let result: any = await reqRemoveUser(userId);
    if (result.code == 200) {
        ElMessage({ type: 'success', message: '删除成功' });
        getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    }
}
//table复选框勾选的时候会触发的事件
const selectChange = (value: any) => {
    selectIdArr.value = value;
}
//批量删除按钮的回调
const deleteSelectUser = async () => {
    //整理批量删除的参数
    let idsList: any = selectIdArr.value.map(item => {
        return item.id;
    });
    //批量删除的请求
    let result: any = await reqSelectUser(idsList);
    if (result.code == 200) {
        ElMessage({ type: 'success', message: '删除成功' });
        getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    }
}

//搜索按钮的回调
const search = () => {
    //根据关键字获取相应的用户数据
    getHasUser();
    //清空关键字
    keyword.value = '';
}
//重置按钮
const reset = () => {
    settingStore.refsh = !settingStore.refsh;
}
//CSV


</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>