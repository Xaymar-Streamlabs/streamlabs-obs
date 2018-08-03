import { Component, Prop } from 'vue-property-decorator';
import ChatbotModToolsBase from 'components/page-components/Chatbot/module-bases/ChatbotModToolsBase.vue';
import { $t } from 'services/i18n';

@Component({})
export default class ChatbotWordProtectionWindow extends ChatbotModToolsBase {
  tabs: { name: string; value: string }[] = [
    {
      name: 'General',
      value: 'general'
    },
    {
      name: 'Blacklist',
      value: 'blacklist'
    }
  ];

  selectedTab: string = 'general';

  onSelectTab(tab: string) {
    this.selectedTab = tab;
  }

  onSave() {
    this.chatbotApiService
      .updateWordProtection({
        enabled: this.wordProtectionResponse.enabled,
        settings: this.wordProtection
      })
      .then(() => {
        this.chatbotCommonService.closeChildWindow();
        this.chatbotCommonService.showToast($t('Saved successfully'), {
          duration: 3000,
          position: 'top-right',
          className: 'toast-success'
        });
      });
  }
}
