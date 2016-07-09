<!-- Small modal -->
<div id="smallModal" class="modal fade" role="dialog" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="gridSystemModalLabel">消息</h4>
            </div>
            <div class="modal-body message"></div>
            <input type="hidden" id="modal-cont" value=''>

            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" id="deleteCancel">关闭</button>
                <button type="button" class="btn btn-primary" id="deleteIt">确定</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->