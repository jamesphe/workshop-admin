# 功能需求文档（Functional Requirements Document）

## 项目名称

车间管理系统移动端 Demo（Workshop Management Mobile Demo）

---

## 概述

本功能需求文档详细描述了车间管理系统需要实现的各项功能和特性，旨在明确系统需要满足的业务需求，以便指导开发和实施。本系统主要服务于山西水塔醋业的生产车间管理，提升生产效率和数据准确性。

---

## 用户角色及权限

### 1. 车间主任

- **主要设备**：移动端应用（H5 或微信小程序）
- **权限**：
  - 录入每日生产数据
  - 提交借调申请
  - 查看本车间员工的工资计算明细
- **限制**：
  - 提交的数据不可修改

### 2. 领导

- **主要设备**：移动端应用
- **权限**：
  - 查看各类统计报表
  - 查看员工效率和工资组成

### 3. 管理员

- **主要设备**：PC 端后台管理系统
- **权限**：
  - 基础数据维护（产品、车间、员工等）
  - 配置工资计算参数
  - 修改和更正提交的数据
  - 查看和导出统计报表

---

## 功能模块

### 一、登录与认证

#### 1. 用户登录

- **功能描述**：用户通过输入用户名和密码登录系统
- **需求细节**：
  - 支持账号密码登录
  - 根据用户角色，进入对应的功能界面
  - 登录失败提示错误信息

#### 2. 角色选择

- **功能描述**：部分用户可能具有多个角色，需选择登录的角色
- **需求细节**：
  - 登录后，若用户具有多个角色，提示选择角色
  - 角色选择后，进入对应的功能模块

### 二、车间主任功能模块

#### 1. 数据录入

- **功能描述**：车间主任录入每日生产数据，包括产品产量、员工工时、翻缸数量等
- **需求细节**：
  - **产品产量录入**：
    - 录入产品编码、名称、数量、单位价格、总金额等
  - **员工工时录入**：
    - 选择员工（包括本车间和借调的员工）
    - 时间段划分：上午、下午、加班
    - 工作类别：包装、杂工、配酿、翻酿
    - 输入每个时间段的工时（小时）
  - **翻缸数量录入**：
    - 录入员工的翻缸次数和翻缸工序
  - **备注**：
    - 可填写当天工作的特殊情况或备注信息
  - **操作**：
    - 数据录入完成后提交，提交的数据不可修改
    - 提交成功后，显示提交成功提示

#### 2. 借调管理

##### 1）借调申请

- **功能描述**：将本车间员工借调到其他车间
- **需求细节**：
  - **借调流程**：
    - 选择需要借调的员工
    - 选择借调日期（可多选）
    - 选择目标车间
    - 提交借调申请
  - **借调限制**：
    - 只能借调本车间的员工
    - 借调日期不能与已有的借调冲突
  - **提示**：
    - 借调申请成功后，提示借调结果

##### 2）借调记录查看

- **功能描述**：查看本车间员工的借调记录
- **需求细节**：
  - 显示员工的借调历史，包括日期、目标车间等
  - 可按日期或员工筛选借调记录

#### 3. 数据查看

- **功能描述**：查看本车间的生产数据和员工工资明细
- **需求细节**：
  - 查看员工的工作数据和工资组成
  - 按日期、员工筛选数据
  - 支持数据导出

### 三、领导功能模块

#### 1. 产量报表查看

- **功能描述**：查看各产品的生产产量和总金额
- **需求细节**：
  - 按日期、产品、车间等条件筛选
  - 显示产品编码、名称、数量、单位价格、总金额
  - 支持图表展示，如柱状图、折线图

#### 2. 翻缸数量统计

- **功能描述**：查看翻缸操作的统计数据
- **需求细节**：
  - 按日期、车间、员工筛选
  - 显示员工的翻缸次数、翻缸工序等
  - 支持数据导出

#### 3. 人员效率对比

- **功能描述**：对比员工的工作效率，便于绩效考核
- **需求细节**：
  - 显示每位员工的工时、产出、工资等
  - 可按工作类别（包装、杂工、配酿、翻酿）查看
  - 支持排名和图表展示

### 四、工资计算模块（系统自动）

#### 1. 工资计算规则

- **功能描述**：根据车间主任提交的数据，自动计算员工工资
- **需求细节**：

  - **工资计算方式**：

    - **灌装车间**：

      - **包装工资**：
        - 包装小时工资 = 产品总金额 / 总工时
        - 员工包装工资 = 员工包装工时 × 包装小时工资
      - **杂工工资**：
        - 固定小时工资（如20元/小时）
        - 员工杂工工资 = 员工杂工工时 × 杂工小时工资
      - **总工资**：包装工资 + 杂工工资

    - **原酿车间**：

      - **配酿工资**：
        - 固定小时工资（如25元/小时）
        - 员工配酿工资 = 员工配酿工时 × 配酿小时工资
      - **翻酿工资**：
        - 单次翻酿工资（如7元/次）
        - 员工翻酿工资 = 翻缸次数 × 单次翻酿工资
      - **总工资**：配酿工资 + 翻酿工资

    - **借调员工工资**：
      - 按照借入车间的工资标准计算

#### 2. 工资明细查看

- **功能描述**：车间主任和领导可以查看工资计算明细
- **需求细节**：
  - **车间主任查看**：
    - 可查看本车间所有员工的工资明细
  - **领导查看**：
    - 可查看所有员工的工资明细

### 五、基础数据管理模块（管理员）

#### 1. 产品管理

- **功能描述**：维护产品的基础资料
- **需求细节**：
  - **操作**：
    - 添加、修改、删除产品
    - 导入和导出产品数据
  - **产品信息**：
    - 产品编码
    - 产品名称
    - 分类（包装成品、原浆、翻醅等）
    - 归属车间
    - 单位价格
    - 效率单价

#### 2. 车间管理

- **功能描述**：管理车间和部门信息
- **需求细节**：
  - **操作**：
    - 添加、修改、删除车间
  - **车间信息**：
    - 车间名称
    - 工资时薪
    - 工序分类

#### 3. 员工管理

- **功能描述**：管理员工的基本信息
- **需求细节**：
  - **操作**：
    - 添加、修改、删除员工
    - 导入和导出员工数据
  - **员工信息**：
    - 姓名
    - 性别
    - 手机号
    - 车间归属
    - 工资系数

#### 4. 工资参数设置

- **功能描述**：配置工资计算的参数
- **需求细节**：
  - 设置小时工资（包装、杂工、配酿等）
  - 设置单次翻酿工资
  - 可根据需要调整工资参数

#### 5. 数据更正

- **功能描述**：修改和更正提交的数据
- **需求细节**：
  - **操作范围**：
    - 产品产量数据
    - 员工工时数据
    - 翻缸数量数据
  - **日志记录**：
    - 记录每次修改的时间、内容和操作人

### 六、统计报表模块（管理员）

#### 1. 综合报表

- **功能描述**：提供全面的生产和工资统计报表
- **需求细节**：
  - 按日期、车间、产品等条件生成报表
  - 显示产量、总金额、员工工资等数据
  - 支持数据导出（Excel、PDF）

#### 2. 成本分析

- **功能描述**：分析各工序、产品的成本分布
- **需求细节**：
  - 统计各工序的总成本和占比
  - 提供图表展示，直观了解成本构成

#### 3. 借调统计

- **功能描述**：统计借调员工的工作情况和工资
- **需求细节**：
  - 显示借调员工的工时、工资、借调日期等
  - 可按车间、日期筛选

### 七、系统设置模块（管理员）

#### 1. 用户管理

- **功能描述**：管理系统用户和权限
- **需求细节**：
  - 添加、修改、删除用户账号
  - 分配用户角色和权限

#### 2. 系统公告

- **功能描述**：发布系统公告和通知
- **需求细节**：
  - 发布新的公告，设置标题和内容
  - 公告可在移动端和PC端显示

---

## 功能需求摘要

- **数据录入**：车间主任录入每日生产数据，包括产品产量、员工工时、翻缸数量
- **工资计算**：自动计算员工工资，车间主任和领导可查看工资明细
- **数据查看**：提供多维度的统计报表和人员效率展示
- **借调管理**：支持员工借调的申请和管理
- **基础数据维护**：产品、车间、员工的基础信息管理
- **权限控制**：根据用户角色，限制功能和数据的访问
- **数据安全**：提交数据后不可修改，修改需管理员操作，并记录日志

---

## 特殊需求

- **数据不可修改性**：车间主任提交的数据不可修改，保障数据完整性
- **权限控制**：严格的权限管理，不同角色只能访问和操作授权范围内的功能和数据
- **数据校验**：录入时需进行必要的校验，防止错误数据进入系统
- **数据安全**：使用 HTTPS 加密传输，重要数据加密存储
- **移动端适配**：界面设计需适合车间主任和领导日常使用的移动设备

---

## 交互流程

### 1. 车间主任数据录入流程

1. **登录**：车间主任登录移动端应用，进入首页
2. **数据录入**：选择“数据录入”功能
3. **输入数据**：
   - **产品产量**：录入产品信息和产量
   - **员工工时**：选择员工，输入工时和工作类别
   - **翻缸数量**：录入员工的翻缸次数
4. **提交**：检查数据，确认无误后提交
5. **结果提示**：提交成功后，显示提交成功提示

### 2. 借调申请流程

1. **登录**：车间主任登录移动端应用，进入首页
2. **借调管理**：选择“借调管理”功能
3. **申请借调**：
   - 选择需要借调的员工和日期
   - 选择目标车间
   - 提交申请
4. **结果提示**：收到借调申请成功提示

### 3. 领导查看报表流程

1. **登录**：领导登录移动端应用，进入首页
2. **数据查看**：选择“数据查看”功能
3. **选择报表**：按需选择产量报表、翻缸统计或人员效率
4. **查看数据**：浏览数据，支持切换不同的筛选条件

---

## 数据字典

### 1. 产品表（Product）

- **字段**：
  - 产品编码（product_code）
  - 产品名称（product_name）
  - 分类（category）
  - 归属车间（workshop_id）
  - 单位价格（unit_price）
  - 效率单价（efficiency_price）

### 2. 员工表（Employee）

- **字段**：
  - 员工编号（employee_id）
  - 姓名（name）
  - 性别（gender）
  - 手机号（phone）
  - 车间归属（workshop_id）
  - 工资系数（salary_coefficient）
  - 角色（role）：车间主任、领导、管理员

### 3. 车间表（Workshop）

- **字段**：
  - 车间编号（workshop_id）
  - 车间名称（name）
  - 工资时薪（hourly_wage）
  - 工序分类（process_category）

### 4. 工时记录表（WorkTimeRecord）

- **字段**：
  - 记录编号（record_id）
  - 员工编号（employee_id）
  - 日期（date）
  - 时间段（time_period）
  - 工作类别（work_type）
  - 工时（hours）
  - 产量/操作次数（output）
  - 所属车间（workshop_id）

### 5. 产品产量表（ProductOutput）

- **字段**：
  - 记录编号（record_id）
  - 产品编码（product_code）
  - 日期（date）
  - 数量（quantity）
  - 单位价格（unit_price）
  - 总金额（total_amount）
  - 所属车间（workshop_id）

### 6. 翻缸记录表（TurningRecord）

- **字段**：
  - 记录编号（record_id）
  - 员工编号（employee_id）
  - 日期（date）
  - 翻缸次数（turning_times）
  - 翻缸工序（turning_process）
  - 所属车间（workshop_id）

### 7. 借调记录表（TransferRecord）

- **字段**：
  - 记录编号（record_id）
  - 员工编号（employee_id）
  - 借调日期（date）
  - 原车间编号（from_workshop_id）
  - 目标车间编号（to_workshop_id）
  - 借调状态（status）

---

## 系统约束

- **数据不可修改性**：车间主任提交的数据不可修改，保障数据完整性
- **权限控制**：严格的权限管理，不同角色只能访问和操作授权范围内的功能和数据
- **数据校验**：录入时需进行必要的校验，防止错误数据进入系统
- **数据安全**：使用 HTTPS 加密传输，重要数据加密存储
- **移动端适配**：界面设计需适合车间主任和领导日常使用的移动设备

---

## 非功能需求

### 1. 性能要求

- **响应速度**：系统应在用户操作后2秒内给予响应
- **并发支持**：支持至少100个用户同时在线操作

### 2. 可靠性

- **稳定运行**：系统应保证99.9%的可用性
- **数据备份**：每日自动备份数据，防止数据丢失

### 3. 可用性

- **用户友好性**：界面简洁，操作流程清晰，符合用户使用习惯
- **帮助与支持**：提供使用指南和在线帮助

### 4. 安全性

- **权限管理**：严格的角色和权限管理
- **数据安全**：防止未授权的访问和数据泄露

### 5. 可维护性

- **代码规范**：遵循编码规范，便于后期维护和升级
- **日志记录**：记录系统操作日志，便于问题追踪

---
