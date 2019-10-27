# frozen_string_literal: true

# name: so-style-topic-list
# about: Displays the topic list in StackOverflow style
# version: 0.1
# authors: fzngagan
# url: https://github.com/fzngagan

register_asset 'stylesheets/common/so-style-topic-list.scss'
register_asset 'stylesheets/desktop/so-style-topic-list.scss'
register_asset 'stylesheets/mobile/so-style-topic-list.scss'

enabled_site_setting :so_style_topic_list_enabled

PLUGIN_NAME ||= 'SoStyleTopicList'

load File.expand_path('lib/so-style-topic-list/engine.rb', __dir__)

after_initialize do
    class ::TopicListItemSerializer
      def excerpt
          object.excerpt
      end

      def include_excerpt?
        object.excerpt.present? && SiteSetting.so_style_topic_list_enabled   && !(object.archetype == Archetype.private_message)
      end
    end
  # https://github.com/discourse/discourse/blob/master/lib/plugin/instance.rb
end
