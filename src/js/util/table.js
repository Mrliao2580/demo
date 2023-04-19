/*
 * @Author: lbh
 * @Date: 2022-12-03 17:35:36
 * @LastEditors: lzh
 * @LastEditTime: 2023-04-19 16:15:27
 * @Description: file content
 */
// in db_student_config.js

export default {
  dbName: 'ricepon-h5-db', // *数据库名称
  version: 1, // 数据库版本号（默认为当前时间戳）
  tables: [
    // 活動表
    {
      tableName: 'activities', // *表名
      option: { keyPath: 'id' }, // 表配置，即ObjectStore配置，此处指明主键为id
      indexs: [
        // 数据库索引（建议加上索引）
        {
          key: 'id', // *索引名
          option: {
            // 索引配置，此处表示该字段不允许重复
            unique: true,
          },
        },
        {
          key: 'key',
        },
        {
          key: 'value',
        },
      ],
    },
    {
      tableName: 'riceposReport', // *表名
      option: { keyPath: 'id' }, // 表配置，即ObjectStore配置，此处指明主键为id
      indexs: [
        // 数据库索引（建议加上索引）
        {
          key: 'id', // *索引名
          option: {
            // 索引配置，此处表示该字段不允许重复
            unique: true,
          },
        },
        {
          key: 'key',
        },
        {
          key: 'value',
        },
      ],
    },
  ],
};