export function convertToPlainText(content) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  return  doc.body.innerText || '';
}

/**
 * 将HTML字符串转换为富文本数据
 * @param htmlString {string} HTML字符串
 */
export function convertHtmlToJson(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  if(!htmlString){
    return [];
  }

  function traverseNode(node) {
    const result = [];

    for (let i = 0; i < node.childNodes.length; i++) {
      const childNode = node.childNodes[i];

      if (childNode.nodeType === Node.TEXT_NODE) {
        result.push({
          type: 'text',
          text: childNode.textContent.trim()
        });
      } else if (childNode.nodeType === Node.ELEMENT_NODE) {
        const elementData = {
          type: childNode.tagName.toLowerCase(),
          children: undefined
        };

        // 添加元素属性
        if (childNode.hasAttributes()) {
          const attributes = childNode.attributes;
          for (let j = 0; j < attributes.length; j++) {
            const attr = attributes[j];
            elementData[attr.name] = attr.value;
          }
        }

        // 递归处理子节点
        elementData.children = traverseNode(childNode);
        result.push(elementData);
      }
    }

    return result;
  }

  const content = traverseNode(doc.body);
  return { content };
}

/**
 * 将富文本数据转换为HTML字符串
 * @param jsonData 富文本数据
 * @returns {string} HTML字符串
 */
export function convertJsonToHtml(jsonData) {
  if (!jsonData || !jsonData.content) {
    return '';
  }
  function traverseNode(node) {
    let html = '';

    for (let i = 0; i < node.length; i++) {
      const item = node[i];

      if (item.type === 'text') {
        html += item.text;
      } else {
        html += `<${item.type}`;

        // 添加元素属性
        for (const [key, value] of Object.entries(item)) {
          if (key !== 'type' && key !== 'children') {
            html += ` ${key}="${value}"`;
          }
        }

        html += '>';

        // 递归处理子节点
        if (item.children) {
          html += traverseNode(item.children);
        }

        html += `</${item.type}>`;
      }
    }

    return html;
  }

  return traverseNode(jsonData);
}

/**
 * 获取文章简介
 * @param markdownText
 * @param maxLength
 */
export function abstractFn(res){
  if(!res){
    return '';
  }else{
    const str=res.replace(/(\*\*|__)(.*?)(\*\*|__)/g,'')          //全局匹配内粗体
      .replace(/\!\[[\s\S]*?\]\([\s\S]*?\)/g,'')                  //全局匹配图片
      .replace(/\[[\s\S]*?\]\([\s\S]*?\)/g,'')                    //全局匹配连接
      .replace(/<\/?.+?\/?>/g,'')                                 //全局匹配内html标签
      .replace(/(\*)(.*?)(\*)/g,'')                               //全局匹配内联代码块
      .replace(/`{1,2}[^`](.*?)`{1,2}/g,'')                       //全局匹配内联代码块
      .replace(/```([\s\S]*?)```[\s]*/g,'')                       //全局匹配代码块
      .replace(/\~\~(.*?)\~\~/g,'')                               //全局匹配删除线
      .replace(/[\s]*[-\*\+]+(.*)/g,'')                           //全局匹配无序列表
      .replace(/[\s]*[0-9]+\.(.*)/g,'')                           //全局匹配有序列表
      .replace(/(#+)(.*)/g,'')                                    //全局匹配标题
      .replace(/(>+)(.*)/g,'')                                    //全局匹配摘要
      .replace(/\r\n/g,"")                                        //全局匹配换行
      .replace(/\n/g,"")                                          //全局匹配换行
      // .replace(/\s/g,"")                                          //全局匹配空字符;
    return str.slice(0,150);
  }
}
