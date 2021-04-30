class MyPromise {

  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  constructor(executor) {
    this.status = MyPromise.PENDING;
    this.value = '';
    this.callbacks = [];
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error)
    }
  }

  resolve(value) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.value = value;

      setTimeout(() => {
        this.callbacks.map(callback => {
          callback.onFulfilled(this.value)
        })
      });
    }
  }

  reject(reason) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.value = reason;

      setTimeout(() => {
        this.callbacks.map(callback => {
          callback.onRejected(this.value)
        })
      });
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = () => this.value;
    }

    if (typeof onRejected !== 'function') {
      onRejected = () => this.value;
    }

    return new MyPromise((resolve, reject) => {
      if(this.status === MyPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: value => {
            try {
              let result = onFulfilled(value);
              if(result instanceof MyPromise) {
                result.then(resolve, reject)
              } else {
                resolve(result);
              }
            } catch (error) {
              reject(error)
            }
          },
          onRejected: value => {
            try {
              let result = onRejected(value);
              if(result instanceof MyPromise) {
                result.then(resolve, reject)
              } else {
                resolve(result);
              }
            } catch (error) {
              reject(error)
            }
          }
        })
      }
  
      if(this.status === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            let result = onFulfilled(this.value);
            if(result instanceof MyPromise) {
              result.then(resolve, reject)
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error)
          }
        });
      }
  
      if(this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            let result = onRejected(this.value);
              if(result instanceof MyPromise) {
                result.then(resolve, reject)
              } else {
                resolve(result);
              }
          } catch (error) {
            reject(error)
          }
        })
      }
    })
  }
}