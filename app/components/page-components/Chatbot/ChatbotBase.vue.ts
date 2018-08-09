import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ChatbotApiService, ChatbotCommonService } from 'services/chatbot/chatbot';
import { Inject } from 'util/injector';
import ToggleInput from 'components/shared/inputs/ToggleInput.vue';
import Tabs from 'components/Tabs.vue';
import DropdownMenu from 'components/shared/DropdownMenu.vue';

import {
  ChatbotPermissionsEnums,
  ChatbotResponseTypes,
  ChatbotPunishments,
} from 'services/chatbot/chatbot-interfaces';

@Component({
  components: {
    ToggleInput,
    Tabs,
    DropdownMenu
  }
})
export default class ChatbotBase extends Vue {
  @Inject() chatbotApiService: ChatbotApiService;
  @Inject() chatbotCommonService: ChatbotCommonService;

  mounted() {
    // pre-load them to switch between 2 windows
    this.chatbotApiService.fetchDefaultCommands();
    this.chatbotApiService.fetchLinkProtection();
  }

  get chatbotPermissions() {
    let permissions = Object.keys(ChatbotPermissionsEnums).reduce(
      (a: any[], b: string) => {
        if (typeof ChatbotPermissionsEnums[b] === 'number') {
          a.push({
            title: b,
            value: ChatbotPermissionsEnums[b]
          });
        }
        return a;
      },
      []
    );
    return permissions;
  }

  get chatbotResponseTypes() {
    return Object.keys(ChatbotResponseTypes).map(responseType => {
      return {
        value: ChatbotResponseTypes[responseType],
        title: responseType
      };
    });
  }

  get chatbotPunishments() {
    return Object.keys(ChatbotPunishments).map(punishmentType => {
      return {
        value: ChatbotPunishments[punishmentType],
        title: punishmentType
      };
    });
  }
}
