

# 项目概述及后端设计

## 主要技术栈

- 前端技术栈
  - ajax
  - jQuery
  - art-template
  - bootstrap
- 后端技术栈
  - node.js
    - express
  - mongodb (mongoose)





## 后端

### 数据层（数据模型）

#### collection -> field

- Users

  | Key                | Type   | Note                       |
  | :----------------- | :----- | :------------------------- |
  | email（邮箱）      | string |                            |
  | password（密码）   | string |                            |
  | username（用户名） | string | 将作为昵称且不可修改       |
  | avatar（头像）     | string |                            |
  | path（服务端路径） | string | 用于删除                   |
  | role（角色）       | string | 'admin' 'teacher' 'normal' |
  | createTime         | date   | default now                |

- Categories

  | Key           | Type   | Note        |
  | ------------- | ------ | ----------- |
  | title（标题） | string |             |
  | createTime    | data   | default now |

- Difficulties

  | Key           | Type   | Note        |
  | ------------- | ------ | ----------- |
  | title（标题） | string |             |
  | createTime    | data   | default now |

- Questions

  | Key                                | Type          | Note        |
  | ---------------------------------- | ------------- | ----------- |
  | title（标题）                      | string        |             |
  | description（题目描述）            | string        |             |
  | md（md 版本）                      | string        |             |
  | image（包含图片）                  | array[string] | 用于删除    |
  | meta {views: number,likes: number} | obj           |             |
  | author（作者 id）                  | id            |             |
  | category                           | array[id]     |             |
  | difficult                          | id            |             |
  | publishDate（发布日期）            | date          | default now |

- QuestionsWhoLikes

  | Key       | Type      | Note |
  | --------- | --------- | ---- |
  | questions | id        |      |
  | users     | array[id] |      |

- Answers

  | Key                                                    | Type          | Note        |
  | ------------------------------------------------------ | ------------- | ----------- |
  | title（标题）                                          | string        |             |
  | content（内容）                                        | string        |             |
  | md（md 版本）                                          | string        |             |
  | image（包含图片）                                      | array[string] | 用于删除    |
  | meta {views: number, likes: number,  comments: number} | obj           |             |
  | author（作者 id）                                      | id            |             |
  | question（题目 id）                                    | id            |             |
  | publishDate（发布日期）                                | date          | default now |

- AnswersComments

  | Key                     | Type   | Note        |
  | ----------------------- | ------ | ----------- |
  | content（评论内容）     | string |             |
  | author（作者 id）       | id     |             |
  | answer（题解 id）       | id     |             |
  | publishDate（发布日期） | date   | default now |

- AnswersWhoLikes

  | Key    | Type      | Note |
  | ------ | --------- | ---- |
  | answer | id        |      |
  | users  | array[id] |      |



### 业务层

- #### 路由设计思路

1. 对不同权限的用户设计不同的一级路由，其分别放置该用户的特殊功能的二级路由
2. 对 admin 和 teacher 权限一级路由下首先匹配一个验证身份的中间件，通过识别 cookie 的登录信息进行放行或返回 404
3. 对于同一类请求行为，应放置在同一路由下，例如管理员行为的请求的一级路由应为 /admin
4. 用户一级路由：**/userAction**	**/admin**	**/teacher**
5. 未登录可请求的路由：**/public** 

- 功能列表

  - [x] 注册
  - [x] 登录
  - [x] 浏览题目和题解
  - [x] 评论题解
  - [x] 用户管理
  - [x] 题目管理
  - [x] 题解管理
  - [x] 难度管理
  - [x] 分类管理
  - [x] 评论管理
  - [x] 题目点赞
  - [x] 题解点赞

- 路由及中间件匹配顺序

  | method / route                           | description                   |
  | ---------------------------------------- | ----------------------------- |
  | express.static                           | 中间件-静态资源访问           |
  | express-formidable                       | 中间件-表单解析               |
  | express-session                          | 中间件-session                |
  |                                          |                               |
  | GET /public/login                        | 获取登录状态                  |
  | GET /public/search/:key                  | 搜索题目                      |
  | GET /public/questions                    | 获取题目列表                  |
  | GET /public/questions/:\_id              | 根据 id 获取题目详情          |
  | GET /public/answers                      | 获取题解列表                  |
  | GET /public/answers/:id                  | 根据 id 获取题解详情          |
  | GET /public/comments                     | 获取题解评论                  |
  | GET /public/comments/:\_id               | 根据 id 获取题解评论          |
  | GET /public/difficulties                 | 获取难度分类                  |
  | GET /public/difficulties/:\_id           | 根据 id 获取难度分类          |
  | GET /public/categories                   | 获取标签分类                  |
  | GET /public/categories/:\_id             | 根据 id 获取标签分类          |
  | POST /public/register                    | （学生）用户注册              |
  | GET /public/usersJsonp                   | 获取当前用户信息（jsonp）     |
  | GET /public/captcha                      | 验证码获取                    |
  |                                          |                               |
  | POST /public/login                       | 登录                          |
  |                                          |                               |
  | 登录拦截                                 | 中间件-登录拦截               |
  | POST /userAction/likes/questions/:\_id   | 题目点赞                      |
  | DELETE /userAction/likes/questions/:\_id | 取消题目点赞                  |
  | POST /userAction/likes/answers/:\_id     | 题解点赞                      |
  | DELETE /userAction/likes/answers/:\_id   | 取消题解点赞                  |
  | POST /userAction/comments/:id            | 评论题解                      |
  | POST /userAction/answers/:\_id           | 添加题解                      |
  | PUT /userAction/answers/:\_id            | 修改题解                      |
  | DELETE /userAction/answers/:id           | 删除题解                      |
  | GET /userAction/users/:id                | 根据 id 获取用户信息          |
  | GET /userAction/users                    | 获取当前用户信息              |
  | PUT /userAction/users                    | 修改当前用户信息              |
  | POST /public/upload                      | 图片上传                      |
  | POST /userAction/logout                  | 登出                          |
  |                                          |                               |
  | 教师行为拦截                             | 中间件-教师行为拦截           |
  | POST /teacher/questions                  | 发布题目                      |
  | DELTET /teacher/questions/:\_id          | 删除题目                      |
  | PUT /teacher/questions/:id               | 修改题目                      |
  | POST /teacher/difficulties               | 添加难度分类                  |
  | PUT /teacher/difficulties/:id            | 根据 id 修改难度分类          |
  | POST /teacher/categories                 | 添加标签分类                  |
  | PUT /teacher/categories/:id              | 根据 id 修改标签分类          |
  |                                          |                               |
  | 管理员行为拦截                           | 中间件-管理员行为拦截         |
  | GET /admin/users                         | 获取用户（列表）              |
  | GET /admin/users/:\_id                   | 根据 id 获取用户              |
  | POST /admin/users                        | 添加用户                      |
  | PUT /admin/users/:\_id                   | 修改用户                      |
  | DELETE /admin/users/:\_id                | 删除用户                      |
  | DELETE /admin/difficulties/:\_id         | 根据 id 删除难度分类          |
  | DELETE /admin/categories/:\_id           | 根据 id 删除标签分类          |
  | DELETE /admin/comments/:\_id             | 根据 id 删除评论              |
  |                                          |                               |
  | 404                                      | 未找到路由，重定向至 404 页面 |





## TODOls

- [x] 接口安全
- [x] 点赞数据层设计
- [x] 数据层实现
 - [x] | express.static                           中间件-静态资源访问          
 - [x] | express-formidable                       中间件-表单解析              
 - [x] | express-session                          中间件-session               
 - [x] |                                                                       
 - [x] | GET /public/login                        获取登录状态                 
 - [x] | GET /public/search/:key                  搜索题目                     
 - [x] | GET /public/questions                    获取题目列表                 
 - [x] | GET /public/questions/:\_id              根据 id 获取题目详情         
 - [x] | GET /public/answers                      根据题目 id 获取题解列表                 
 - [x] | GET /public/answers/:id                  根据 id 获取题解详情         
 - [x] | GET /public/comments                     获取题解评论                 
 - [x] | GET /public/comments/:\_id               根据 id 获取题解评论         
 - [x] | GET /public/difficulties                 获取难度分类                 
 - [x] | GET /public/difficulties/:\_id           根据 id 获取难度分类         
 - [x] | GET /public/categories                   获取标签分类                 
 - [x] | GET /public/categories/:\_id             根据 id 获取标签分类         
 - [x] | POST /public/register                    （学生）用户注册             
 - [x] | GET /userAction/usersJsonp                    获取当前用户信息（jsonp）       
 - [x] | GET /public/captcha                      验证码获取                   
 - [x] |                                                                       
 - [x] | POST /public/login                       登录                         
 - [x] |                                                                       
 - [x] | 登录拦截                                 中间件-登录拦截              
 - [x] | POST /userAction/likes/questions/:\_id   题目点赞                     
 - [x] | DELETE /userAction/likes/questions/:\_id 取消题目点赞
 - [x] | POST /userAction/likes/answers/:\_id     题解点赞                     
 - [x] | DELETE /userAction/likes/answers/:\_id   取消题解点赞                 
 - [x] | POST /userAction/comments/:id            评论题解                     
 - [x] | POST /userAction/answers/:\_id           添加题解                     
 - [x] | PUT /userAction/answers/:\_id            修改题解                     
 - [x] | DELETE /userAction/answers/:id           删除题解                     
 - [x] | GET /userAction/users                           获取当前用户信息       
 - [x] | GET /userAction/users/:\_id                   根据 id 获取用户信息             
 - [x] | PUT /userAction/users                    修改当前用户信息             
 - [x] | POST /userAction/upload                      图片上传                     
 - [x] | POST /userAction/logout                  登出                         
 - [x] |                                                                       
 - [x] | 教师行为拦截                             中间件-教师行为拦截          
 - [x] | POST /teacher/questions                  发布题目                     
 - [x] | DELTET /teacher/questions/:\_id          删除题目                     
 - [x] | PUT /teacher/questions/:id               修改题目                     
 - [x] | POST /teacher/difficulties               添加难度分类                 
 - [x] | PUT /teacher/difficulties/:\_id              根据 id 修改难度分类                 
 - [x] | POST /teacher/categories                 添加标签分类                 
 - [x] | PUT /teacher/categories/:\_id             根据 id 修改标签分类                 
 - [x] |                                                                       
 - [x] | 管理员行为拦截                           中间件-管理员行为拦截        
 - [x] | GET /admin/users                         获取用户（列表）             
 - [x] | POST /admin/users                        添加用户                     
 - [x] | PUT /admin/users/:\_id                   修改用户                     
 - [x] | DELETE /admin/users/:\_id                删除用户                     
 - [x] | DELETE /admin/difficulties/:\_id         根据 id 删除难度分类             
 - [x] | DELETE /admin/categories/:\_id           根据 id 删除标签分类             
 - [x] | DELETE /admin/comments/:\_id             根据 id 删除评论                 
 - [x] |                                                                       
 - [x] | 404             





## 前端

**==以下内容不为标准==**

**==前端开发尚未完成，目标其实是一个单页应用==**

### 概述

- 用户结构：管理员用户、教师用户、学生用户

  教师可以管理题目、自己的题解、管理难度和标签分类

  管理员可以管理题目，用户、评论、题解

  学生用户可以发布评论、题解

  （教师发布的题解应该明显标注置顶）

- 设计模式：前后端分离



### 前端结构

- /list.html 题目列表页
- /detail.html 题目详情页
- /answer.html 题解详情页
- /user/*.html 个人中心
- /admin/*.html 管理员管理页
- /teacher/*.html 教师管理页
- /register.html 注册页面



### 页面内容

#### 前台展示

- /index.html（主页面）展示题目列表

  导航通栏、搜索框、筛选框（ + 难度分类 + 标签分类）、列表（ + 分页器）

- /detail.html 题目详情

  导航通栏、题目详情、题解列表、评论（ + 评论框 + 分页器）、点赞

- /register.html 注册页面

  email	username	password （ + confirmPassword）

- /answer.html 题解详情页

  导航通栏、题解内容、点赞、评论（+ 评论框 + 分页器）
  
- /user用户个人中心

  - modify.html 修改个人信息
  - 未完...
  
  ---

#### 后台管理

- /admin 管理员

  ==通过导航的下拉框进行导航==

  - /questions.html 题目管理
  - /addQuestion.html 发布题目
  - /modifyQuestion.html 修改题目

- /teacher 教师

  ==通过导航的下拉框进行导航==
  
  - /questions.html 题目管理
  - /addQuestion.html 发布题目
  - /modifyQuestion.html 修改题目
  - /users.html 用户管理
  - /addUser.html 添加用户
  - /modifyUser.html 修改用户
  
  ---



### 前端功能分析

- 导航通栏

  该通栏应位于任何一个页面中

  通栏项目应该包括

  - 首页
  - 个人中心
    - 修改信息
  - 教师
    - 题目发布
    - 题目管理
    - 分类管理
  - 管理员
    - 题目发布
    - 题目管理
    - 分类管理
    - 用户管理

  当登录用户为教师或管理员时，导航栏需追加渲染 /teacher 及 /admin 的入口（菜单）。

- 当登录用户为管理员用户时，渲染每个评论的删除按钮

