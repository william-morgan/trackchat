
import { h } from 'virtual-dom'

export default Ember.Object.create({
  render(widget) {
    this.widget     = widget
    this.post       = widget.state.post
    this.topic      = widget.state.topic
    if (this.post.deleted_at || !_.compact(this.actions()).length) { return }

    let status = this.widget.state.open ? '.opened' : '.closed'

    return h(`div.babble-post-actions${status}`, [this.dropdown(), this.button()])
  },

  button() {
    return this.widget.attach('button', {
      icon: 'ellipsis-h',
      action: 'open',
      className: 'btn normalized babble-post-actions-ellipsis',
      sendActionEvent: true
    })
  },

  dropdown() {
    if (!this.widget.state.open) { return }
    return h('div.babble-post-actions-menu', this.actions())
  },

  actions() {
    return [this.edit(), this.flag(), this.delete()]
  },

  edit() {
    if (this.post.can_edit) {
      return this.widget.attach('link', { className: 'btn', icon: 'pencil', action: 'edit', label: 'post.controls.edit_action' })
    }
  },

  flag() {
    if (this.post.can_flag) {
      if (this.post.has_flagged) {
        return h('div.widget-link.babble-link-disabled', [h('i.fa.fa-flag'), I18n.t('babble.flagged')])
      } else {
        return this.widget.attach('link', { className: 'btn', icon: 'flag', action: 'flag', label: 'post.actions.flag' })
      }
    }
  },

  delete() {
    if (this.post.can_delete) {
      return this.widget.attach('link', { className: 'btn', icon: 'trash-o', action: 'delete', label: 'user.admin_delete' })
    }
  }

})
