//有需要全局调用的组件都可以引入进来
import SvgIcon from '../components/svgIcons/SvgIcon.vue'
const allGloablComponent = { SvgIcon }
export default {
  install(app) {
    Object.keys(allGloablComponent).forEach((key) => {
      app.component(key, allGloablComponent[key])
    })
  }
}
