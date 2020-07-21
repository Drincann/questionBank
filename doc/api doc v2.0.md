# 接口文档



## 文档说明

- 格式说明

  > 接口说明表格的结构如下：
  >
  > | method / request URL |
  > | -------------------- |
  > | param1 - description |
  > | param2 - description |
  > | param3 - description |

- 路由结构

  | 一级路由                                    |
  | ------------------------------------------- |
  | /public - 任何客户端均可以访问的接口        |
  | /userAction - 登录后才可以访问的接口        |
  | /teacher - 教师和管理员用户才可以访问的接口 |
  | /admin - 仅管理员用户才可以访问的接口       |

- 其他内容不赘述，见另一文档，内容包含

  - 技术栈说明
  - 前端结构概述及功能分析
  - 后端数据层设计
  - 后端路由设计及详细匹配顺序
  - 后端进度 todols

- 权限问题

  路由 /public、/userAction、/teacher、/admin，分别对应用户 "游客（未登录）"、"学生（已登录）"、"教师"、"管理员"

  接口组与允许访问的用户类型如下：

  | 路由        | 用户类型                         |
  | ----------- | -------------------------------- |
  | /public     | 未登录的用户、学生、教师、管理员 |
  | /userAction | 学生、教师、管理员               |
  | /teacher    | 教师、管理员                     |
  | /admin      | 管理员                           |

- 分页数据解释

  ```json
  //...
      "pages": [
          "1",
          "2"
      ],
  	// 页列表
  
      "page": "1",
  	// 当前页
  
      "tailPage": 1,
  	// 尾页
  
      "total": 3
  	// 总条目数量
  }
  ```

  



## 1. 用户操作

### 1.1 用户登录（游客）

- 方法及参数

  | POST /public/login    |
  | --------------------- |
  | email - 邮箱          |
  | password - 密码       |
  | verification - 验证码 |

- 返回

  - success

    ```json
    {
        "_id": "5ea40eaaa0fc7a5a34b54651",
        "email": "example@email.com",
        "username": "gaolihaiUnm",
        "avatar": "\uploads\upload_a876c399b4e9682867ca1549926bd714.jpg",
        "role": "student",
        "createTime": "2020-04-25T10:19:22.569Z"
    }
    ```

  - fail

    ```json
    {
        "message": "验证码错误！" //...
    }
    ```

- 备注：接口可被多次调用，调用时会首先清除登录状态。



### 1.2 用户注册（游客）

- 方法及参数

  | POST /public/register |
  | --------------------- |
  | email - 邮箱          |
  | username - 用户名     |
  | password - 密码       |
  | verification - 验证码 |

- 返回

  - success

    ```json
    {
        "_id": "5ea40eaaa0fc7a5a34b54651",
        "email": "example@email.com",
        "username": "gaolihaiUnm",
        "avatar": "\uploads\upload_e99e365d83afcc99452142989baa9ed1.jpg",
        "role": "student",
        "createTime": "2020-04-25T10:19:22.569Z"
    }
    ```

  - fail

    ```json
    {
        "message": "验证码错误！" //...
    }
    ```



### 1.3 获取当前用户信息（游客）（jsonp）

- 方法及参数

  | GET /public/usersJsonp |
  | ---------------------- |
  | 无参数                 |

- 返回

  - success

    已登录：

    ```js
    window.user = {
        _id : '${user._id}',
        email : '${user.email}',
        username : '${user.username}',
        avatar : '${user.avatar}',
        role : '${user.role}',
    };
    window.isLogin = true;
    ```

    未登录：

    ```js
    window.isLogin = false;
    ```

    

  - fail

    ```json
    window.userError = ${error.message};
    ```




### 1.4 获取当前用户信息（学生）

- 方法及参数

  | GET /userAction/users |
  | --------------------- |
  | 无参数                |

- 返回

  - success

    ```js
    {
        "_id": "5ea1b118e0b50950a8000d5b",
        "email": "1019933576@qq.com",
        "username": "高厉害",
        "avatar": null,
        "role": "admin",
        "createTime": "2020-04-29T05:04:21.616Z"
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



### 1.5 根据 id 获取用户信息（学生）

- 方法及参数

  | GET /userAction/users/:userId |
  | ----------------------------- |
  | 无参数                        |

- 返回

  - success

    ```js
    {
        "_id": "5ea1b118e0b50950a8000d5b",
        "email": "1019933576@qq.com",
        "username": "高厉害",
        "avatar": null,
        "role": "admin",
        "createTime": "2020-04-29T05:04:21.616Z"
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



### 1.6 修改当前用户信息（学生）

- 方法及参数

  | PUT /userAction/users                                        |
  | ------------------------------------------------------------ |
  | avatar - 头像（可选）                                        |
  | oldPwd - 旧密码（可选）                                      |
  | newPwd - 新密码（可选）（若仅上传一个 oldPwd 和 newPwd 其中一个，则会返回 400 状态吗） |

- 返回

  - success

    ```js
    {
        "message": "修改成功！"
        // 备注：即便未发生修改行为，只要没有出现错误，就会返回该信息
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



### 1.7 获取用户列表（管理员）

- 方法及参数

  | GET /admin/users                                             |
  | ------------------------------------------------------------ |
  | page - 页数                                                  |
  | count - 每页条数（<= 30）                                    |
  | role - 角色筛选（可选）（ 允许通过验证的值 : ['admin', 'teacher', 'student'] ） |

- 返回

  - success

    ```json
    {
        "users": [
            {
                "avatar": "\\upload_a65ce214e60adbe045fa5e3cc4c737bf.jpg",
                "role": "admin",
                "_id": "5ea918dfbc35c10e601902ef",
                "email": "example@em1ail.com",
                "username": "gaoli1haiUnm",
                "createTime": "2020-04-29T06:04:15.629Z",
                "__v": 0
            },
            // ...
        ],
        "pages": [
            "1"
        ],
        "page": "1",
        "tailPage": 1,
        "total": 3
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



### 1.8 直接添加用户（管理员）

- 方法及参数

  | POST /admin/users                                            |
  | ------------------------------------------------------------ |
  | email - 邮箱                                                 |
  | password - 密码                                              |
  | username - 用户名                                            |
  | role - 角色（可选，默认为 'student'）（ 允许通过验证的值 : ['admin', 'teacher', 'student'] ） |
  | avatar - 头像（可选）                                        |

- 返回

  - success

    ```json
    {
        "users": [
            {
                "avatar": "\\upload_a65ce214e60adbe045fa5e3cc4c737bf.jpg",
                "role": "admin",
                "_id": "5ea918dfbc35c10e601902ef",
                "email": "example@em1ail.com",
                "username": "Unm",
                "createTime": "2020-04-29T06:04:15.629Z",
                "__v": 0
            },
            // ...
        ],
        "pages": [
            "1"
        ],
        "page": "1",
        "tailPage": 1,
        "total": 3
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



### 1.9 根据 id 修改用户（管理员）

- 方法及参数

  | PUT /admin/users                                             |
  | ------------------------------------------------------------ |
  | email - 邮箱 （可选）                                        |
  | password - 密码 （可选）                                     |
  | username - 用户名 （可选）                                   |
  | role - 角色（可选，默认为 'student'）（ 允许通过验证的值 : ['admin', 'teacher', 'student'] ） |
  | avatar - 头像（可选）                                        |

- 返回

  - success

    ```json
    {
        "avatar": "\\upload_a65ce214e60adbe045fa5e3cc4c737bf.jpg",
        "path": null,
        "role": "admin",
        "_id": "5ea918dfbc35c10e601902ef",
        "email": "example@em1ail.com",
        "username": "Unm",
        "createTime": "2020-04-29T06:04:15.629Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```

### 1.10 退出登录

- 方法及参数

  | POST /userAction/logout |
  | ----------------------- |
  | 无参数                  |

  - success

    ```json
    {
        "message":"登出成功"
    }
    ```

  - fail

    ```json
    {
        "message":error.message
    }
    ```

    

## 2. 分类操作

### 2.1 难度分类

#### 2.1.1 获取难度分类列表（游客）

***

- 方法及参数

  | GET /public/difficulties |
  | ------------------------ |
  | 无参数                   |

- 返回

  - success

    ```json
    [
        {
            "_id": "5ea55522801d7846c081b79e",
            "title": "exampleTitle",
            "createTime": "2020-04-26T09:32:18.685Z",
            "__v": 0
        },
    	//...
    ]
    ```

  - fail

    ```json
     {
         "message": error.message //...
     }
    ```



#### 2.1.2 根据 id 获取难度分类（游客）

***

- 方法及参数

  | GET /public/difficulties/difficultyId |
  | ------------------------------------- |
  | 无参数                                |

- 返回

  - success

    ```json
    {
        "_id": "5ea55566f65e0a3d58b1f17c",
        "title": "exampleTitle",
        "createTime": "2020-04-26T09:33:26.302Z",
        "__v": 0
    }
    ```

  - fail

    ```json
     {
         "message": error.message //...
     }
    ```



#### 2.1.3 添加难度分类（教师）

***

- 方法及参数

  | POST /teacher/difficulties         |
  | ---------------------------------- |
  | title - 分类标题 - 1 ~ 20 字符之间 |

- 返回

  - success

    ```json
    {
        "_id": "5ea55566f65e0a3d58b1f17c",
        "title": "exampleTitle",
        "createTime": "2020-04-26T09:33:26.302Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



#### 2.1.4 根据 id 修改难度分类（教师）

***

- 方法及参数

  | PUT /teacher/difficulties/:difficultyId |
  | --------------------------------------- |
  | title - 分类标题 - 1 ~ 20 字符之间      |

- 返回

  - success

    ```json
    {
        "_id": "5ea55522801d7846c081b79e",
        "title": "changed",
        "createTime": "2020-04-26T09:32:18.685Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



#### 2.1.5 根据 id 删除难度分类（管理员）

***

- 方法及参数

  | DELETE /admin/difficulties/:difficultyId |
  | ---------------------------------------- |
  | 无参数                                   |

- 返回

  - success

    ```json
    {
        "message": "删除成功"
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```





### 2.2 标签分类

#### 2.2.1 获取标签分类列表（游客）

***

- 方法及参数

  | GET /public/categories |
  | ---------------------- |
  | 无参数                 |

- 返回

  - success

    ```json
    [
        {
            "_id": "5ea5525566c2651918648935",
            "title": "exampleTitle",
            "createTime": "2020-04-26T09:20:21.825Z",
            "__v": 0
        },
    	//...
    ]
    ```

  - fail

    ```json
     {
         "message": error.message //...
     }
    ```

    

#### 2.2.2 根据 id 获取标签分类（游客）

***

- 方法及参数

  | GET /public/categories/:categoryId |
  | ---------------------------------- |
  | 无参数                             |

- 返回

  - success

    ```json
    {
        "_id": "5ea5525566c2651918648935",
        "title": "exampleTitle",
        "createTime": "2020-04-26T09:20:21.825Z",
        "__v": 0
    }
    ```

  - fail

    ```json
     {
         "message": error.message //...
     }
    ```




#### 2.2.3 添加标签分类（教师）

***

- 方法及参数

  | POST /teacher/categories           |
  | ---------------------------------- |
  | title - 分类标题 - 1 ~ 20 字符之间 |

- 返回

  - success

    ```json
    {
        "_id": "5ea5537f81c79503e8cab26e",
        "title": "exampleTitle",
        "createTime": "2020-04-26T09:25:19.555Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



### 2.2.4 根据 id 修改标签分类（教师）

- 方法及参数

  | PUT /teacher/categories/:categoryId |
  | ----------------------------------- |
  | title - 分类标题 - 1 ~ 20 字符之间  |

- 返回

  - success

    ```json
    {
        "_id": "5ea5529266c2651918648936",
        "title": "changed",
        "createTime": "2020-04-26T09:21:22.615Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



#### 2.2.5 根据 id 删除标签分类（管理员）

***

- 方法及参数

  | DELETE /admin/categories/:categoryId |
  | ------------------------------------ |
  | 无参数                               |

- 返回

  - success

    ```json
    {
        "message": "删除成功"
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```





## 3. 题目操作

### 3.1 获取题目列表（游客）

- 方法及参数

  | GET /public/questions                                |
  | ---------------------------------------------------- |
  | page - 页数                                          |
  | count - 每页数量（<= 30）                            |
  | sort - 排序方式 - 0 : 时间 / 1 : 点赞数 / 2 : 点击量 |
  | categories - 标签分类（数组）（可选）                |
  | difficulties - 难度分类（数组）（可选）              |
  | key - 搜索关键字（可选）                             |

- 返回

  - success

    ```json
    {
        "questions": [
            {
                "meta": {
                    "views": 4,
                    "likes": 0
                },
                "category": [
                    {
                        "_id": "5ea5537f81c79503e8cab26e",
                        "title": "exampleTitle",
                        "createTime": "2020-04-26T09:25:19.555Z",
                        "__v": 0
                    },
            		//...
                ],
                "difficulty": {
                    "_id": "5ea55566f65e0a3d58b1f17c",
                    "title": "exampleTitle",
                    "createTime": "2020-04-26T09:33:26.302Z",
                    "__v": 0
                },
                "_id": "5ea836e8bb44535b7c0a2d6c",
                "title": "exampleTitle",
                "author": {
                    "avatar": null,
                    "path": null,
                    "role": "admin",
                    "_id": "5ea1b118e0b50950a8000d5b",
                    "email": "1019933576@qq.com",
                    "username": "高厉害",
                    "__v": 0,
                    "createTime": "2020-04-28T14:09:43.401Z"
                },
                "publishDate": "2020-04-28T14:00:08.782Z",
                "__v": 0
            },
            //...
        ],
        "pages": [
            "1",
            "2",
            "3",
            "4"
        ],
        "page": "2",
        "tailPage": 1,
        "total": 3
  }
    ```

  - fail
  
    ```json
    {
        "message": error.message //...
    }
    ```



### 3.2 根据 id 获取题目（游客）

- 方法及参数

  | GET /public/questions/:questionId |
  | --------------------------------- |
  | 无参数                            |


- 返回

  - success

    ```json
    {
        "question":{
            "meta": {
                "views": 4,
                "likes": 1
            },
            "image": [],
            "category": [
                {
                    "_id": "5ea5537f81c79503e8cab26e",
                    "title": "exampleTitle",
                    "createTime": "2020-04-26T09:25:19.555Z",
                    "__v": 0
                },
                //...
            ],
            "difficulty": {
                "_id": "5ea55566f65e0a3d58b1f17c",
                "title": "exampleTitle",
                "createTime": "2020-04-26T09:33:26.302Z",
                "__v": 0
            },
            "_id": "5ea836e8bb44535b7c0a2d6c",
            "title": "exampleTitle",
            "description": "<h1>example</h1>",
            "md": "# example",
            "author": {
                "avatar": null,
                "path": null,
                "role": "admin",
                "_id": "5ea1b118e0b50950a8000d5b",
                "email": "1019933576@qq.com",
                "username": "高厉害",
                "__v": 0,
                "createTime": "2020-04-28T14:09:43.401Z"
            },
            "publishDate": "2020-04-28T14:00:08.782Z",
            "__v": 0
        },
      "liked":true
    }
    ```
  
  - fail
  
    ```json
    {
        "message": error.message //...
    }
    ```



### 3.3 发布题目（教师）

- 方法及参数

  | POST /teacher/questions                              |
  | ---------------------------------------------------- |
  | title - 题目标题                                     |
  | description - 题目描述（html 格式）                  |
  | md - 题目描述（markdown 格式）                       |
  | image - 包含的图片文件名（可选）                     |
  | category - 标签分类 _id（可选）（多个分类用 - 隔开） |
  | difficulty - 难度分类 _id（难度分类仅有一个）        |

- 返回

  - success

    ```json
    {
        "meta": {
            "views": 0,
            "likes": 0
        },
        "image": [],
        "category": [
            {
                "_id": "5ea5537f81c79503e8cab26e",
                "title": "exampleTitle",
                "createTime": "2020-04-26T09:25:19.555Z",
                "__v": 0
            },
    		//...
        ],
        "_id": "5ea83db8b04d044eb890f993",
        "title": "exampleTitle",
        "description": "<h1>example</h1>",
        "md": "# example",
        "difficulty": {
            "_id": "5ea55566f65e0a3d58b1f17c",
            "title": "exampleTitle",
            "createTime": "2020-04-26T09:33:26.302Z",
            "__v": 0
        },
        "author": "5ea1b118e0b50950a8000d5b",
        "publishDate": "2020-04-28T14:29:12.720Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



### 3.4 修改题目（教师）

- 方法及参数

  | PUT /teacher/questions/:questionId                           |
  | ------------------------------------------------------------ |
  | title - 题目标题（可选）                                     |
  | description - 题目描述（html 格式）（可选）                  |
  | md - 题目描述（markdown 格式）（可选）（务必与 description 一起提交，否则会拦截请求） |
  | image - 包含的图片文件名（可选）                             |
  | category - 标签分类 _id（多个分类用 - 隔开）（可选）         |
  | difficulty - 难度分类 _id（难度分类仅有一个）（可选）        |

- 返回

  - success

    ```json
    {
        "meta": {
            "views": 9,
            "likes": 1
        },
        "image": [],
        "category": [
            {
                "_id": "5ea5537f81c79503e8cab26e",
                "title": "exampleTitle",
                "createTime": "2020-04-26T09:25:19.555Z",
                "__v": 0
            },
            //...
        ],
        "_id": "5ea55f944556ad138817703d",
        "title": "exampleTitle",
        "description": "<h1>example</h1>",
        "md": "# example",
        "difficulty": {
            "_id": "5ea55566f65e0a3d58b1f17c",
            "title": "exampleTitle",
            "createTime": "2020-04-26T09:33:26.302Z",
            "__v": 0
        },
        "author": "5ea1b118e0b50950a8000d5b",
        "publishDate": "2020-04-26T10:16:52.164Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```

  

### 3.5 删除题目（教师）

- 方法及参数

  | DELETEE /teacher/questions/:questionId |
  | -------------------------------------- |
  | 无参数                                 |

- 返回

  - success

    ```json
    {
        "message": "删除成功"
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```

## 4. 题解操作

### 4.1 获取题解列表（游客）

- 方法及参数

  | GET /public/answers                                          |
  | ------------------------------------------------------------ |
  | questionId - 题目 id（可选）（根据题目 id 筛选）             |
  | userId - 用户 id（可选）（根据用户 id 筛选）                 |
  | role - 作者角色（可选）（通过验证的值：'student' 'teacher' admin）（与 userId 冲突，该参数与 userId 一同传递时会被忽略） |
  | page - 页数                                                  |
  | count - 每页数量（<= 30）                                    |
  | sort - 排序方式 - 0 : 时间 / 1 : 点赞数 / 2 : 点击量 / 3 : 评论数 |

- 返回

  - success

    ```json
    {
        "answers": [
            {
                "meta": {
                    "views": 0,
                    "likes": 0,
                    "comments": 0
                },
                "_id": "5ea586bc8a0d230110b66107",
                "title": "exampleTitle",
                "question": "5ea55f944556ad138817703d",
                "author": {
                    "avatar": null,
                    "path": null,
                    "role": "admin",
                    "_id": "5ea1b118e0b50950a8000d5b",
                    "email": "1019933576@qq.com",
                    "username": "高厉害",
                    "__v": 0,
                    "createTime": "2020-04-26T15:31:06.473Z"
                },
                "publishDate": "2020-04-26T13:03:56.348Z",
                "__v": 0
            },
            //...
        ],
        "pages": [
            "1"
        ],
        "page": "1",
        "tailPage": 1,
        "total": 1
    }
    ```
    
  - fail
  
  ```json
    {
      "message": error.message //...
    }
  ```

### 4.2 根据题解 id 获取题解（游客）

- 方法及参数

  | GET /public/answers/:questionId |
  | ------------------------------- |
  | 无参数                          |


- 返回

  - success

    ```json
    {
        "answer":{
            "meta": {
                "views": 36,
                "likes": 2,
                "comments": 3
            },
            "image": [],
            "_id": "5ea586bc8a0d230110b66107",
            "title": "exampleTitle",
            "content": "<h1>exampleContent</h1>",
            "md": "# exampleContent",
            "question": {
                "_id": "5ea55f944556ad138817703d",
                "title": "exampleTitle"
            },
            "author": {
                "avatar": null,
                "path": null,
                "role": "admin",
                "_id": "5ea1b118e0b50950a8000d5b",
                "email": "1019933576@qq.com",
                "username": "高厉害",
                "__v": 0,
                "createTime": "2020-04-28T14:45:01.871Z"
            },
            "publishDate": "2020-04-26T13:03:56.348Z",
            "__v": 0
        },
      "liked":false
    }
    ```

  
  - fail
  
    ```json
    {
        "message": error.message //...
    }
    ```

### 4.3 发布题解（学生）

- 方法及参数

  | POST /userAction/answers/:questionId |
  | ------------------------------------ |
  | title - 标题                         |
  | content - html 正文                  |
  | md - markdown 正文                   |
  | image - 文章包含图片文件名 （数组）  |

- 返回

  - success

    ```json
    {
        "meta": {
            "views": 0,
            "likes": 0,
            "comments": 0
        },
        "image": [],
        "_id": "5ea586bc8a0d230110b66107",
        "title": "exampleTitle",
        "content": "<h1>exampleContent</h1>",
        "md": "# exampleContent",
        "question": "5ea55f944556ad138817703d",
        "author": "5ea1b118e0b50950a8000d5b",
        "publishDate": "2020-04-26T13:03:56.348Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```

  

### 4.4 根据 id 修改题解（学生）

- 方法及参数

  | PUT /userAction/answers/:answerId                            |
  | ------------------------------------------------------------ |
  | title - 标题（可选）                                         |
  | content - html 正文（可选）                                  |
  | md - markdown 正文 （可选）（务必与 content 字段同时提供，该处后端已做了安全处理，仅提供两字段的其中一个则会被服务端拒绝） |
  | image - 文章包含图片文件名 （可选）（数组）                  |

- 返回

  - success

    ```json
    {
        "meta": {
            "views": 38,
            "likes": 2,
            "comments": 3
        },
        "image": [],
        "_id": "5ea586bc8a0d230110b66107",
        "title": "change",
        "content": "<h1>123</h1>",
        "md": "# 123",
        "question": "5ea55f944556ad138817703d",
        "author": "5ea1b118e0b50950a8000d5b",
        "publishDate": "2020-04-26T13:03:56.348Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```

### 4.5 根据 id 删除题解（学生）

- 方法及参数

  | DELETE /userAction/answers/:answerId |
  | ------------------------------------ |
  | 无参数                               |

- 返回

  - success

    ```json
    {
        "message": "删除成功！"
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```



### 4.6 题解评论操作

#### 4.6.1 根据题解 id 获取评论列表（游客）

***

- 方法及参数

  | GET /public/comments      |
  | ------------------------- |
  | answerId - 题目 id        |
  | page - 页数               |
  | count - 每页数量（<= 30） |

- 返回

  - success

    ```json
    {
        "comment": [
            {
                "likes": 0,
                "_id": "5ea56fdecb1be62c6005bad8",
                "content": "exampleContent",
                "answer": "5ea55f944556ad138817703d",
                "author": {
                    "avatar": null,
                    "path": null,
                    "role": "admin",
                    "_id": "5ea1b118e0b50950a8000d5b",
                    "email": "1019933576@qq.com",
                    "username": "高厉害",
                    "__v": 0,
                    "createTime": "2020-04-27T02:00:57.304Z"
                },
                "publishDate": "2020-04-26T11:26:22.548Z",
                "__v": 0
            },
            //.	..
        ],
        "pages": [
            "1"
        ],
        "page": "1",
        "tailPage": 1,
        "total": 1
  }
    ```

  - fail
  
    ```json
    {
        "message": error.message //...
    }
    ```



#### 4.6.2 根据评论 id 获取评论（游客）

***

- 方法及参数

  | GET /public/comments/:commentId |
  | :------------------------------ |
  | 无参数                          |

- 返回

  - success

    ```json
    {
        "_id": "5ea56fdecb1be62c6005bad8",
        "likes": 0,
        "content": "exampleContent",
        "answer": "5ea55f944556ad138817703d",
        "author": {
            "avatar": null,
            "path": null,
            "role": "admin",
            "_id": "5ea1b118e0b50950a8000d5b",
            "email": "1019933576@qq.com",
            "username": "高厉害",
            "__v": 0,
            "createTime": "2020-04-27T02:07:47.360Z"
        },
        "publishDate": "2020-04-26T11:26:22.548Z",
        "__v": 0
    }
    ```

  - fail

    ```json
     {
         "message": error.message //...
     }
    ```



#### 4.6.3 评论题解（学生）

***

- 方法及参数

  | POST /userAction/comments/:answerId |
  | ----------------------------------- |
  | content - 评论内容                  |

- 返回

  - success

    ```json
    {
        "likes": 0,
        "_id": "5ea586bc8a0d230110b66107",
        "content": "exampleContent",
        "answer": "5ea55f944556ad138817703d",
        "author": "5ea1b118e0b50950a8000d5b",
        "publishDate": "2020-04-26T11:26:22.548Z",
        "__v": 0
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```




#### 4.6.4 根据评论 id 删除评论（学生）

***

- 方法及参数

  | DELETE /userAction/comments/:commentId |
  | -------------------------------------- |
  | 无参数                                 |

- 返回

  - success

    ```json
    {
        "message": "删除成功！"
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```

- 备注：该接口仅能删除自己的评论，删除其他人的评论会返回 400 状态码并提示"无权限"。

### 4.6.5 根据评论 id 删除评论（管理员）

- 方法及参数

  | DELETE /admin/comments/:commentId |
  | --------------------------------- |
  | 无参数                            |

- 返回

  - success

    ```json
    {
        "message": "删除成功"
    }
    ```

  - fail

    ```json
    {
        "message": error.message
    }
    ```

- 备注：可以删除所有评论。



## 5. 点赞操作

### 5.1 题目点赞 / 取消

#### 5.1.1 题目点赞（学生）

***

- 方法及参数

  | POST /userAction/likes/questions/:questionId |
  | -------------------------------------------- |
  | 无参数                                       |

- 返回

  - success

    ```json
    {
        "message": "点赞成功！"
    }
    ```

  - fail

    ```json
    {
        "message": "您已经点过赞了！"//...
    }
    ```



#### 5.1.2 题目取消点赞（学生）

***

- 方法及参数

  | DELETE /userAction/likes/questions/:questionId |
  | ---------------------------------------------- |
  | 无参数                                         |

- 返回

  - success

    ```json
    {
        "message": "取消点赞成功！"
    }
    ```

  - fail

    ```json
    {
        "message": "您还未点赞！"//...
    }
    ```



### 5.2 题解点赞 / 取消

### 5.2.1 题解点赞（学生）

- 方法及参数

  | POST /userAction/likes/answers/:answerId |
  | ---------------------------------------- |
  | 无参数                                   |

- 返回

  - success

    ```json
    {
        "message": "点赞成功！"
    }
    ```

  - fail

    ```json
    {
        "message": "您已经点过赞了！"//...
    }
    ```



### 5.2.2 题解取消点赞（学生）

- 方法及参数

  | DELETE /userAction/likes/answers/:answerId |
  | ------------------------------------------ |
  | 无参数                                     |

- 返回

  - success

    ```json
    {
        "message": "取消点赞成功！"
    }
    ```

  - fail

    ```json
    {
        "message": "您还未点赞！"//...
    }
    ```





## 6. 验证码 / 图片上传

### 6.1 获取验证码（游客）

- 方法及参数

  | GET /public/captcha |
  | ------------------- |
  | 无参数              |

- 返回 svg 格式验证码数据



###  6.22 图片上传（游客）

- 方法及参数

  | POST /userAction/upload |
  | ----------------------- |
  | * - 图片数据            |

- 返回

  - success

    ```json
    {
        "*": "\\uploads\\upload_f9bbf0c2ee96bcd83e427950b9a4d730.jpg",
        //...
    }
    ```

    注意，当文件为空时，`key`对应的值为 `""`

  - fail

    ```json
    {
        "message": error.message
    }
    ```

- 备注：可以一次上传多个文件，键名随意。

