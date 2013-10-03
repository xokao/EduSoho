define(function(require, exports, module) {
    var Validator = require('bootstrap.validator');
    require('common/validator-rules').inject(Validator);
    var Notify = require('common/bootstrap-notify');

    exports.run = function() {

        var $modal = $('#student-remark-form').parents('.modal');

        var validator = new Validator({
            element: '#student-remark-form',
            autoSubmit: false,
            onFormValidated: function(error, results, $form) {
                if (error) {
                    return false;
                }
                
                $.post($form.attr('action'), $form.serialize(), function(html) {
                    var $html = $(html);
                    console.log($('#'+$html.attr('id'))[0]);
                    $('#'+$html.attr('id')).replaceWith($html);
                    $modal.modal('hide');
                    Notify.success('备注学员成功');
                }).error(function(){
                    Notify.danger('备注学员失败，请重试！');
                });
            }

        });

        validator.addItem({
            element: '#student-remark',
            required: false,
            rule: 'maxlength{max:80}',
            display: '备注'
        });

    };

});