import { withPluginApi } from "discourse/lib/plugin-api";
import { on, default as computed } from 'ember-addons/ember-computed-decorators';

function initializeSoStyleTopicList(api) {
  // https://github.com/discourse/discourse/blob/master/app/assets/javascripts/discourse/lib/plugin-api.js.es6
  api.modifyClass('component:topic-list-item', {
    @computed()
    expandPinned() {
      return true;
    },
    posterName: Ember.computed.alias('topic.creator.name') ,
    @computed("topic.creator.user_fields.@each.value")
    publicUserFields() {
      const siteUserFields = this.site.get("user_fields");
      if (!Ember.isEmpty(siteUserFields)) {
        const userFields = this.get("topic.creator.user_fields");
        return siteUserFields
          .sortBy("position")
          .map(field => {
            Ember.set(field, "dasherized_name", field.get("name").dasherize());
            const value = userFields ? userFields[field.get("id")] : null;
            return Ember.isEmpty(value)
              ? null
              : Ember.Object.create({ value, field });
          })
          .compact();
      }
    },
    @computed('topic.created_at')
    createdAtFormatted(createdAt){
    return moment(createdAt).fromNow();
    },
    @computed('topic.can_vote', 'topic.qa_enabled')
    showSideDiv(canVote, qaEnabled){
      return canVote && qaEnabled;
    } ,

    @computed('topic.views')
    topicViews(views){
      return views + ( views == 1 ? " view" : " views" );
    } ,
    @computed('topic.can_vote', 'topic.vote_count')
    topicVotes(canVote, voteCount){
      return canVote ? (voteCount + (voteCount == 1 ? " vote":" votes")) : false ;
    },

    @computed('topic.qa_enabled', 'topic.answer_count')
    topicAnswers(qaEnabled, answerCount){
      return qaEnabled ? (answerCount + (answerCount == 1 ? " answer":" answers")) : false ;
    },
  });
}

export default {
  name: "so-style-topic-list-plug",

  initialize() {
    withPluginApi("0.8.31", initializeSoStyleTopicList);
  }
};
