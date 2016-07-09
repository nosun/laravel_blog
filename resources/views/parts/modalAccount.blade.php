<div id="accountModal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="blue bigger"></h4>
            </div>
            <form class="form-horizontal" role="form" accept-charset="utf-8" id="accountForm">
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group">
                            <label for="name" class="col-sm-2 control-label">名称</label>
                            <div class="col-xs-12 col-sm-6">
                                <span class="block input-icon input-icon-right">
                                    <input type="text" placeholder="名称" name="name" class="form-control" required>
                                </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="type" class="col-sm-2 control-label">类型</label>

                            <div class="col-xs-12 col-sm-6">
                                <select name="type" class="form-control">
                                    <option value="website">网站</option>
                                    <option value="server">服务器</option>
                                    <option value="other">其他</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="belong" class="col-sm-2 control-label">所属</label>
                            <div class="col-xs-12 col-sm-6">
                                <span class="block input-icon input-icon-right">
                                    <input type="text" placeholder="公司？个人" name="belong" class="form-control" required>
                                </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="address" class="col-sm-2 control-label">网址/IP</label>
                            <div class="col-xs-12 col-sm-6">
                        <span class="block input-icon input-icon-right">
                            <input type="text" placeholder="网址/IP" name="address" class="form-control" required>
                        </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="account" class="col-sm-2 control-label">帐号</label>

                            <div class="col-xs-12 col-sm-6">
                                <span class="block input-icon input-icon-right">
                                    <input type="text" placeholder="帐号" name="account" class="form-control" required>
                                </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password" class="col-sm-2 control-label">密码</label>
                            <div class="col-xs-12 col-sm-6">
                                <span class="block input-icon input-icon-right">
                                    <input type="text" placeholder="密码" name="password" class="form-control" required>
                                </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="info" class="col-sm-2 control-label">备注</label>
                            <div class="col-xs-12 col-sm-6">
                                <textarea class="form-control" name="info" rows="3" placeholder="备注"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="tag" class="col-sm-2 control-label">标签</label>
                            <div class="col-xs-12 col-sm-6">
                                <textarea class="form-control" name="tag" rows="3" placeholder="json array"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-sm btn-primary" type="submit" id="editSubmit">
                        确定
                    </button>
                    <button type="button" data-dismiss="modal" class="btn btn-sm btn-danger">
                        关闭
                    </button>
                </div>
                <div class="message"></div>
            </form>
        </div>
    </div>
</div>