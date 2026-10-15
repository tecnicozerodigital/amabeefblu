// comps
import Layout from './layout/Layout.vue'
import Row from './layout/Row/Row.vue'
import Col from './layout/Col/Col.vue'
import Hero from './layout/Hero.vue'
import BxsView from './layout/View.vue'

import Alert from './Alert.vue'
import Btn from './Btn.vue'
import Chip from './Chip.vue'
import ChipGroup from './ChipGroup.vue'
import Icon from './Icon.vue'
import Menu from './Menu.vue'
import FloatMenu from './FloatMenu.vue'
import List from './List.vue'
import ListItem from './ListItem.vue'
import CollapseItem from './CollapseItem.vue'
import Spacer from './Spacer.vue'
import Toolbar from './Toolbar.vue'
import Card from './Card.vue'
import Figure from './media/FigureComp.vue'
import FigureV2 from './media/FigureCompV2.vue'
import Loader from './Loader.vue'
import Avatar from './Avatar.vue'
import Carousel from './Carousel.vue'
import Divider from './Divider.vue'
import Drawer from './Drawer.vue'
import StickySweet from './StickySweet.vue'
import Modal from './Modal.vue'
import Marquee from './Marquee.vue'
import FloatConfirm from './FloatConfirm.vue'
import Skeleton from './Skeleton.vue'

import Form from './form/Form.vue'
import BxsField from './form/BxsField.vue'
import BxsTextField from './form/BxsTextField.vue'
import BxsGeoField from './form/BxsGeoField.vue'
import BxsDobField from './form/BxsDobField.vue'
import BxsSelectField from './form/BxsSelectField.vue'
import BxsTextareaField from './form/BxsTextareaField.vue'
import BxsUploaderField from './form/BxsUploaderField.vue'

import BxsSwitchField from './form/BxsSwitchField.vue'
import BxsRadioField from './form/radioField.vue'
import RadioGroupField from './form/RadioGroupField.vue'
import QtyField from './form/QtyField.vue'

import DataLazy from './DataLazy.vue'

import Footer from './layout/Footer.vue'
import TopNavigation from './TopNavigation.vue'
import FileUploader from './FileUploader.vue'

import Logo from './logo.vue'
import ProjectBtn from './project/Btn.vue'
import ProjectDivider from './project/Divider.vue'
import ProjectSectionDivider from './project/SectionDivider.vue'
import ProjectCard from './project/Card.vue'
import ProjectCardV2 from './project/CardV2.vue'
import ProjectControls from './project/Controls.vue'

// libs
// import Toast from 'vue-toastification'

// import 'vue-toastification/dist/index.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function createComp(app) {
    app.component('logo', Logo)
    app.component('btn', ProjectBtn)
    app.component('p-divider', ProjectDivider)
    app.component('p-section-divider', ProjectSectionDivider)
    app.component('p-card', ProjectCard)
    app.component('p-card-v2', ProjectCardV2)
    app.component('p-controls', ProjectControls)
    app.component('bxs-figure-v2', FigureV2)

    app.component('bxs-top-nav', TopNavigation)
    app.component('bxs-layout', Layout)
    app.component('bxs-row', Row)
    app.component('bxs-col', Col)
    app.component('bxs-footer', Footer)
    app.component('bxs-hero', Hero)
    app.component('bxs-view', BxsView)
    app.component('bxs-skeleton', Skeleton)

    app.component('bxs-divider', Divider)
    app.component('bxs-alert', Alert)
    app.component('bxs-drawer', Drawer)
    app.component('bxs-sticky-sweet', StickySweet)
    app.component('bxs-modal', Modal)
    app.component('bxs-marquee', Marquee)

    app.component('bxs-toolbar', Toolbar)
    app.component('bxs-card', Card)
    app.component('bxs-data-lazy', DataLazy)
    app.component('bxs-figure', Figure)
    app.component('bxs-carousel', Carousel)
    app.component('bxs-file-uploader', FileUploader)

    app.component('bxs-btn', Btn)
    app.component('bxs-menu', Menu)
    app.component('bxs-float-menu', FloatMenu)
    app.component('bxs-list', List)
    app.component('bxs-list-item', ListItem)
    app.component('bxs-collapse-item', CollapseItem)
    app.component('bxs-float-confirm', FloatConfirm)

    app.component('bxs-icon', Icon)
    app.component('bxs-chip', Chip)
    app.component('bxs-avatar', Avatar)
    app.component('bxs-chip-group', ChipGroup)
    app.component('bxs-loader', Loader)

    app.component('bxs-form', Form)
    app.component('bxs-field', BxsField)
    app.component('bxs-switch-field', BxsSwitchField)
    app.component('bxs-geo-field', BxsGeoField)
    app.component('bxs-text-field', BxsTextField)
    app.component('bxs-dob-field', BxsDobField)
    app.component('bxs-radio-field', BxsRadioField)
    app.component('bxs-select-field', BxsSelectField)
    app.component('bxs-textarea-field', BxsTextareaField)
    app.component('bxs-qty-field', QtyField)
    app.component('tsm-radio-group-field', RadioGroupField)
    app.component('bxs-uploader-field', BxsUploaderField)

    app.component('bxs-spacer', Spacer)

    // app.use(Toast, {
    //     position: 'top-center',
    //     timeout: 3500,
    //     closeOnClick: true,
    //     pauseOnFocusLoss: false,
    //     pauseOnHover: false,
    //     newestOnTop: false,
    //     transition: 'Vue-Toastification__fade',
    //     bodyClassName: ['bxs-notify'],
    //     maxToasts: 1,
    //     showCloseButtonOnHover: true,
    //     hideProgressBar: true,
    //     draggable: true
    // })
}