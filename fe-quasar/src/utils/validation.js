/**
 * 유효성 걸린 엘리먼트 조회
 * @param {Object} validator 유효청 처리기
 * @param {Object} refs 참조 엘리먼트 데이터
 * @returns {Element} 엘리먼트
 * @since 2022.12.26
 * @author 김희수
 */
export const getInvalidRefElement = (validator, refs) => {
  let invalidElement = null;

  for (let key in Object.keys(validator)) {
    const name = Object.keys(validator)[key];

    if (name.indexOf("$") === -1 && validator[name].$error) {
      const ref = refs[name]?.value;

      if (ref) {
        if (ref.$refs?.field) {
          invalidElement = Object.values(ref.$refs?.field?.$refs)[0].$el;
        } else if (ref.$refs?.input) {
          invalidElement = ref.$refs?.input?.$el || ref.$refs?.input;
        } else if (ref.$refs?.focusInput) {
          invalidElement = ref.$refs?.focusInput;
        } else if (Object.keys(ref.$refs).length === 0 || ref?.$el) {
          invalidElement = ref.$el;
        } else {
          invalidElement =
            Object.keys(ref.$refs)
              .filter((key) => key.indexOf("focus") !== -1)
              .map((key) => ref.$refs[key])[0] ||
            Object.values(ref.$refs)[0].$el;
        }
      }

      break;
    }
  }

  return invalidElement;
};

/**
 * 엘리먼트 조회
 * @param {Object} refs 참조 엘리먼트 데이터
 * @param {String} refName 참조 엘리먼트 이름
 * @returns {Element} 엘리먼트
 * @since 2022.12.26
 * @author 김희수
 */
export const getRefElement = (refs, refName) => {
  const ref = refs[refName]?.value;
  let element = null;

  if (ref) {
    if (ref.$refs?.field) {
      element = Object.values(ref.$refs?.field?.$refs)[0].$el;
    } else if (ref.$refs?.input) {
      element = ref.$refs?.input?.$el || ref.$refs?.input;
    } else if (ref.$refs?.focusInput) {
      invalidElement = ref.$refs?.focusInput;
    } else if (Object.keys(ref.$refs).length === 0 || ref?.$el) {
      element = ref.$el;
    } else {
      element =
        Object.keys(ref.$refs)
          .filter((key) => key.indexOf("focus") !== -1)
          .map((key) => ref.$refs[key])[0] || Object.values(ref.$refs)[0].$el;
    }
  }

  return element;
};

const touchMap = new WeakMap();
/**
 * 유효성 체크 지연
 * @param {Object} validator 체크할 유효성 필드
 * @since 2023.03.07
 * @author 김희수
 */
export const delayTouch = (validator) => {
  validator.$reset();

  if (touchMap.has(validator)) {
    clearTimeout(touchMap.get(validator));
  }

  // 마지막 동작 후 0.5초 후 트리거
  touchMap.set(validator, setTimeout(validator.$touch, 500));
};
/**
 * 유효성 체크 지연 제거
 * @param {Object} validator 제거할 유효성 필드
 * @since 2023.03.27
 * @author 김희수
 */
export const clearDelayTouch = (validator) => {
  // validator.$reset();

  if (touchMap.has(validator)) {
    clearTimeout(touchMap.get(validator));
  }
};

/**
 * 제외 문자 조회
 * @returns {String} 제외 문자
 * @since 2023.03.09
 * @author 김희수
 */
export const getExceptionCharacter = () => {
  return "( ) { } \" ' ` \\ * & ^";
};

/**
 * 제외 문자 불포함 여부 체크
 * @param {String} value 체크할 데이터
 * @returns {Boolean} 불포함 여부
 * @since 2022.12.13
 * @author 김희수
 */
export const excludeExceptionCharacter = (value) => {
  const exceptionCharacter = getExceptionCharacter()
    .replace(/\\/g, "\\\\")
    .replaceAll(/\s/g, "");
  const regexp = new RegExp("[" + exceptionCharacter + "]", "g");

  return !regexp.test(value);
};

/* 타입 체크 */
export const getType = (target) => {
  return Object.prototype.toString.call(target).slice(8, -1);
};

export const isString = (target) => {
  return getType(target) === "String";
};

export const isNumber = (target) => {
  return getType(target) === "Number";
};

export const isBoolean = (target) => {
  return getType(target) === "Boolean";
};

export const isNull = (target) => {
  return getType(target) === "Null";
};

export const isUndefined = (target) => {
  return getType(target) === "Undefined";
};

export const isObject = (target) => {
  return getType(target) === "Object";
};

export const isArray = (target) => {
  return getType(target) === "Array";
};

export const isDate = (target) => {
  return getType(target) === "Date";
};

export const isRegExp = (target) => {
  return getType(target) === "RegExp";
};

export const isFunction = (target) => {
  return getType(target) === "Function";
};

export default {
  getInvalidRefElement,
  getRefElement,
  delayTouch,
  clearDelayTouch,
  excludeExceptionCharacter,
};
