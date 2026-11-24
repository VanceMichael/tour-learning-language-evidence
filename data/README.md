# 数据字典

合成记录采用 UTF-8 JSON 数组。主键和字段名称见 `manifest.json`。空值为来源未提供。

phase 取 pre 或 post。同一匿名学生只在同班可关联。取首次有效答卷时，first 先于 repeated，仍缺的题保持缺。历史分配按班级，辅助实际发到轮次，以确认到场判定实际接触。同一能力目标的共同链接按相交的 comparable_item 判定，并受 trusted_link 和有效作答覆盖约束。字幕不占现场译员时长；每场需要口译时占所列完整分钟。

- `classes.json`　成组分配的对象、能力段及原分配，概率为正。
- `rounds.json`　计划观演和实际辅助方式。opened 为实际整组开放。
- `roster.json`　匿名学生名册，用于判断学生或整班未进入某次测量。
- `attendance.json`　匿名同组编号及是否到场。
- `items.json`　题项的能力目标、版本与共同内容，仅 trusted_link 为可用等值依据。
- `responses.json`　首次与重答、前测与后测及作答情况。
- `withdrawals.json`　班级撤回答卷的范围；all 表示不限定。
- `decision_policy.json`　跨版本比较的共通题和班级下限、可用译员时间和购买辅助的最小效益。
- `booking.json`　新场候选、已确认场次及本地无障碍要求。
