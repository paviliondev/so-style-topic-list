module SoStyleTopicList
  class Engine < ::Rails::Engine
    engine_name "SoStyleTopicList".freeze
    isolate_namespace SoStyleTopicList

    config.after_initialize do
      Discourse::Application.routes.append do
        mount ::SoStyleTopicList::Engine, at: "/so-style-topic-list"
      end
    end
  end
end
