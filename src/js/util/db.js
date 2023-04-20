import Idb from 'idb-js'; //  引入Idb
import table_config from './table'; //  引入数据库配置

// 數據庫對象
let _db_ = null;

// 數據庫操作
let db_ = {
  // 開啟數據庫
  open () {
    return new Promise((req, res) => {
      if (!_db_) {
        Idb(table_config)
          .then((db) => {
            _db_ = db;
            req();
          })
          .catch((e) => {
            console.log(e);
          });
      } else req();
    });
  },
  // 關閉數據庫
  close () {
    if (_db_) _db_.close_db();
  },
  // 刪除數據庫
  delete () {
    if (_db_) _db_.delete_db();
  },
};

// 外部操作類
class Db {
  constructor(tableName) {
    this.tableName = tableName;
  }
  /**
   * 保存
   * @param {*} params
   */
  set (key, value, tableName) {
    if (!tableName) tableName = this.tableName;
    return new Promise((a, b) => {
      db_.open().then(() => {
        this.get(key).then((res) => {
          // 已存在, 走修改
          if (res) {
            _db_.update({
              tableName: tableName,
              condition: (item) => {
                return item.key == key;
              },
              handle: (r) => {
                r.value = value;
              },
              success: () => {
                a();
              },
            });
          } else {
            let params = {
              key,
              value,
            };
            params.id = Date.now();
            _db_.insert({
              tableName: this.tableName,
              data: params,
              success: () => {
                a();
              },
            });
          }
        });
      });
    });
  }
  /**
   * 根據 key 獲取 數據
   * @param {*} params
   * @returns
   */
  get (key, tableName) {
    if (!tableName) tableName = this.tableName;
    return new Promise((a, b) => {
      db_.open().then(() => {
        _db_.query({
          tableName: tableName,
          condition: (item) => {
            return item.key == key;
          },
          success: (res) => {
            let data = res[0] || [];
            if (data.id) {
              a(data.value);
            } else {
              a('');
            }
          },
        });
      });
    });
  }

  /**
   * 根據key刪除
   * @param {*} key
   */
  remove (key, tableName) {
    if (!tableName) tableName = this.tableName;
    db_.open().then(() => {
      _db_.delete({
        tableName: tableName,
        condition: (item) => {
          return item.key == key;
        },
      });
    });
  }
}

export default Db;
