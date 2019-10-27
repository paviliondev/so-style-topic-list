class SoStyleTopicListConstraint
  def matches?(request)
    SiteSetting.so_style_topic_list_enabled
  end
end
